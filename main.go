package main

import (
	"embed"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

//go:embed FileBox/dist/*
var staticFiles embed.FS

type FileInfo struct {
	Type         string    `json:"type"`
	Name         string    `json:"name"`
	ModifiedDate time.Time `json:"modifiedDate"`
	Size         *int64    `json:"size,omitempty"`
}

type DirectoryResponse struct {
	CurrentPath string     `json:"currentPath"`
	Files       []FileInfo `json:"files"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

func main() {
	app := fiber.New()

	app.Use("/", filesystem.New(filesystem.Config{
		Root:   http.FS(staticFiles),
		PathPrefix: "FileBox/dist",
	}))

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusOK)
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		if err := serveDirectory(c, "."); err != nil {
			log.Printf("Error serving initial directory: %v", err)
			c.WriteJSON(ErrorResponse{Error: "Failed to serve initial directory"})
			return
		}

		for {
			_, msg, err := c.ReadMessage()
			if err != nil {
				log.Printf("Error reading message: %v", err)
				c.WriteJSON(ErrorResponse{Error: "Failed to read message"})
				break
			}
			log.Printf("Received message: %s", msg)

			dirPath := string(msg)
			if err := serveDirectory(c, dirPath); err != nil {
				log.Printf("Error serving directory: %v", err)
				c.WriteJSON(ErrorResponse{Error: fmt.Sprintf("Failed to serve directory: %v", err)})
			}
		}
	}))

	log.Printf("Server starting on :3000")
	if err := app.Listen(":3000"); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}

func serveDirectory(c *websocket.Conn, dirPath string) error {
	absPath, err := filepath.Abs(dirPath)
	if err != nil {
		return fmt.Errorf("failed to get absolute path: %w", err)
	}

	files, err := os.ReadDir(absPath)
	if err != nil {
		return fmt.Errorf("failed to read directory '%s': %w", absPath, err)
	}

	var fileInfos []FileInfo
	for _, file := range files {
		fileType := "file"
		var size *int64

		info, err := file.Info()
		if err != nil {
			log.Printf("Error getting info for file '%s': %v", file.Name(), err)
			continue
		}

		if file.IsDir() {
			fileType = "directory"
		} else {
			fileSize := info.Size()
			size = &fileSize
		}

		fileInfos = append(fileInfos, FileInfo{
			Type:         fileType,
			Name:         file.Name(),
			ModifiedDate: info.ModTime(),
			Size:         size,
		})
	}

	response := DirectoryResponse{
		CurrentPath: absPath,
		Files:       fileInfos,
	}

	if err := c.WriteJSON(response); err != nil {
		return fmt.Errorf("failed to send directory information: %w", err)
	}

	return nil
}
