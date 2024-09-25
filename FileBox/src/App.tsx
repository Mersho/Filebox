import { Button, Checkbox } from "@headlessui/react"
import moment from "moment"
import { useState, useEffect } from "react"
import { Icon } from "./components/ui/icon"
import { bytesToSize, getParentDirectory, joinPaths } from "./lib/utils"
import { IconName } from "./assets/icons"

interface FileInfo {
  type: "file" | "directory"
  name: string
  modifiedDate: string
  size?: number
}

interface DirectoryResponse {
  currentPath: string
  files: FileInfo[]
}

interface ErrorResponse {
  error: string
}

interface ItemProps {
  name: string
  onCheckChange: (checked: boolean) => void
  modifiedDate: Date
  icon: JSX.Element
  size?: number
  onDoubleClick?: () => void
}

function Item({ name, onCheckChange, modifiedDate, icon, size, onDoubleClick }: ItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChange(checked?: boolean) {
    setIsChecked(checked ?? !isChecked)
    onCheckChange(checked ?? !isChecked)
  }

  return (
    <div
      className="relative w-32 lg:w-40 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-700"
    >
      <Checkbox
        className="absolute top-2 left-2 group block size-4 rounded border-2 border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 data-[checked]:bg-blue-500 data-[checked]:border-blue-500"
        checked={isChecked}
        onChange={handleChange}
      >
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
      <Button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Icon name="threeDots" className="w-5 h-5" />
      </Button>
      <div
        className="flex flex-col items-center text-center group relative"
        onClick={() => handleChange()}
        onDoubleClick={onDoubleClick}
      >
        {icon}
        <span className="w-full truncate mt-2 text-sm lg:text-base dark:text-white">{name}</span>
        <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity delay-1000	duration-300 whitespace-nowrap z-10 overflow-hidden w-0 group-hover:w-auto">
          {name}
        </span>
        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {moment(modifiedDate).fromNow()} {icon.props.name !== "folder" ? `- ${bytesToSize(size)}` : ''}
        </span>
      </div>
    </div>
  )
}

const FolderItem = (props: Omit<ItemProps, 'icon'>) => (
  <Item {...props} icon={<Icon name="folder" className="w-12 h-12 lg:w-20 lg:h-20" />} />
)

const FileItem = (props: Omit<ItemProps, 'icon'>) => (
  <Item
    {...props}
    icon={
      <Icon
        name={
          props.name.split('.').length > 1
            ? (props.name.split('.').pop()?.toLowerCase() || 'unknown') as IconName
            : 'unknown'
        }
        className="w-12 h-12 lg:w-20 lg:h-20"
      />
    }
  />
)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('isDarkMode')
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })

  const [currentPath, setCurrentPath] = useState("")
  const [homePath, setHomePath] = useState(() => {
    return localStorage.getItem('homePath') || ""
  })
  const [newPath, setNewPath] = useState("")

  const [ws, setWs] = useState<WebSocket | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [selectedCount, setSelectedCount] = useState(0)
  const [fileInfos, setFileInfos] = useState<FileInfo[]>([])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.hostname}:3000/ws`)
    setWs(ws)

    function handleWebSocketOpen() {
      console.log('Connected to WebSocket')
      const storedPath = localStorage.getItem('currentPath')
      if (storedPath) {
        ws.send(storedPath)
      }
    }

    function handleWebSocketMessage(event: MessageEvent) {
      const data = JSON.parse(event.data)
      if ('error' in data) {
        setError((data as ErrorResponse).error)
        setFileInfos([])
      } else {
        const response = data as DirectoryResponse
        setCurrentPath(response.currentPath)
        localStorage.setItem('currentPath', response.currentPath)
        setNewPath("")
        setFileInfos(response.files)
        setError(null)
        setHomePath(prevHomePath => {
          if (!prevHomePath) {
            const newHomePath = response.currentPath
            localStorage.setItem('homePath', newHomePath)
            return newHomePath
          }
          return prevHomePath
        })
      }
    }

    function handleWebSocketError(error: Event) {
      console.error('WebSocket error:', error)
      setError('Failed to connect to the server')
    }

    function handleWebSocketClose() {
      console.log('WebSocket connection closed')
    }

    ws.onopen = handleWebSocketOpen
    ws.onmessage = handleWebSocketMessage
    ws.onerror = handleWebSocketError
    ws.onclose = handleWebSocketClose

    return () => {
      ws.close()
    }
  }, [])

  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN && newPath !== "") {
      ws.send(newPath)
    }
  }, [newPath, ws])

  function handleCheckChange(checked: boolean) {
    setSelectedCount(prevCount => checked ? prevCount + 1 : prevCount - 1)
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  function handleDoubleClick(fileInfo: FileInfo) {
    if (fileInfo.type === 'directory') {
      setNewPath(joinPaths(currentPath, fileInfo.name));
      setSelectedCount(0);
    }
  }

  function handleBackButton() {
    setNewPath(getParentDirectory(currentPath));
    setSelectedCount(0);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-8">
        <Button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </Button>
        <div className="mb-4">
          <div className="flex items-center">
            <Button
              className="rounded data-[hover]:bg-sky-500 data-[active]:bg-sky-700 mr-2 text-white"
              onClick={() => handleBackButton()}>
              <Icon name="back" className="w-6 h-6 sm:w-7 sm:h-7" />
              <defs>
                <style>{`.cls-1{fill:none;stroke:${isDarkMode ? '#ffffff' : '#000000'};stroke-linecap:round;stroke-linejoin:round;stroke-width:20px;}`}</style>
              </defs>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">My Drive</h1>
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            {currentPath && (
              <div className="flex items-center">
                <Button
                  className="rounded data-[hover]:bg-sky-500 data-[active]:bg-sky-700 mr-2 text-white"
                  onClick={() => setNewPath(homePath)}
                >
                  <Icon name="home" className="w-6 h-6 sm:w-7 sm:h-7" fill={isDarkMode ? 'white' : 'black'} />
                </Button>
                <span className="px-3 py-1 bg-gray-700 text-white text-xs sm:text-sm rounded-full">
                  {currentPath}
                </span>
              </div>
            )}
            {selectedCount > 0 && (
              <span className="px-3 py-1 mt-1 bg-blue-500 text-white text-xs sm:text-sm rounded-full">
                {selectedCount} selected
              </span>
            )}
          </div>
        </div>
        {error ? (
          <div className="text-red-500 dark:text-red-400 mb-4">{error}</div>
        ) : (
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {fileInfos.map((fileInfo, index) => (
              fileInfo.type === 'directory' ? (
                <FolderItem
                  key={index}
                  name={fileInfo.name}
                  onCheckChange={handleCheckChange}
                  modifiedDate={new Date(fileInfo.modifiedDate)}
                  onDoubleClick={() => handleDoubleClick(fileInfo)}
                />
              ) : (
                <FileItem
                  key={index}
                  name={fileInfo.name}
                  onCheckChange={handleCheckChange}
                  modifiedDate={new Date(fileInfo.modifiedDate)}
                  size={fileInfo.size}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
