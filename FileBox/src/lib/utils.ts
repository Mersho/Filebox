function bytesToSize(bytes?: number) {
    if (bytes === 0 || bytes === undefined) {
        return "0 Byte";
    }
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + sizes[i];
}

const joinPaths = (...paths: string[]): string => {
    return paths
        .join(paths.includes("\\") ? "\\" : "/")
        .replace(/\\/g, "/")
        .replace(/\/+/g, "/")
        .replace(/\/$/, "");
};

function getParentDirectory(path: string): string {
    const isRoot = path === "/" || /^[a-zA-Z]:[\\]?$/.test(path);
    if (isRoot) return path.includes("\\") ? path : path + "\\";

    const parts = path.split(/[/\\]/);
    parts.pop();
    const parentDir = parts.join(path.includes("\\") ? "\\" : "/");
    return parentDir.endsWith("\\") || parentDir.endsWith("/")
        ? parentDir
        : parentDir + (path.includes("\\") ? "\\" : "/");
}

export { bytesToSize, joinPaths, getParentDirectory };
