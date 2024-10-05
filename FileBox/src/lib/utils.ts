function bytesToSize(bytes?: number) {
    if (bytes === 0 || bytes === undefined) {
        return "0B";
    }
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + sizes[i];
}

const joinPaths = (...paths: string[]): string => {
    const separator = paths.some(path => path.includes("\\")) ? "\\" : "/"
    return paths
        .join(separator)
        // This normalizes the path by removing redundant separators.
        .replace(/[\\/]+/g, separator)
        // This ensures the path doesn't end with a separator.
        .replace(/[\\/]$/, "")
}

function getParentDirectory(path: string): string {
    const isRoot = path === "/" || /^[a-zA-Z]:[\\]?$/.test(path);
    if (isRoot) return path;

    const parts = path.split(/[/\\]/);
    parts.pop();
    const parentDir = parts.join(path.includes("\\") ? "\\" : "/");
    return parentDir.endsWith("\\") || parentDir.endsWith("/")
        ? parentDir
        : parentDir + (path.includes("\\") ? "\\" : "/");
}

export { bytesToSize, joinPaths, getParentDirectory };
