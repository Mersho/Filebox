import { Checkbox } from "@headlessui/react"
import moment from "moment"
import { useState, useEffect } from "react"

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" className="w-12 h-12 lg:w-20 lg:h-20">
    <rect width="28" height="15" x="32" y="16" fill="#f29611" rx="2.5" ry="2.5" />
    <path fill="#ffb32c" d="M59.778 61H12.222A6.421 6.421 0 016 54.396V17.604A6.421 6.421 0 0112.222 11h18.476a4.671 4.671 0 014.113 2.564L38 24h21.778A5.91 5.91 0 0166 30v24.396A6.421 6.421 0 0159.778 61z" />
    <path fill="#f2a222" d="M8.015 59c2.169 2.383 4.698 2.016 6.195 2h44.57a6.277 6.277 0 005.207-2z" />
  </svg>
)

const ThreeDotsButton = () => (
  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  </button>
)

const FolderItem = ({ name, onCheckChange, modifiedDate }: { name: string; onCheckChange: (checked: boolean) => void; modifiedDate: Date }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onCheckChange(checked);
  };

  return (
    <div className="relative flex flex-col items-center w-32 lg:w-36 text-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-700">
      <Checkbox
        className="absolute top-2 left-2 group block size-4 rounded border-2 border-gray-300 bg-white dark:bg-gray-600 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 data-[checked]:bg-blue-500 data-[checked]:border-blue-500"
        checked={isChecked}
        onChange={handleChange}
      >
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Checkbox>
      <ThreeDotsButton />
      <FolderIcon />
      <span className="mt-2 text-sm lg:text-base dark:text-white">{name}</span>
      <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{moment(modifiedDate).fromNow()}</span>
    </div>
  );
};

function App() {
  const [selectedCount, setSelectedCount] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  function handleCheckChange(checked: boolean) {
    setSelectedCount(prevCount => checked ? prevCount + 1 : prevCount - 1)
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-8">
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-300"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
        <div className="flex items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">My Drive</h1>
          {selectedCount > 0 && (
            <span className="ml-4 px-2 py-1 bg-blue-500 text-white text-sm rounded-full">
              {selectedCount} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-6 lg:gap-8">
          <FolderItem name="Video" onCheckChange={handleCheckChange} modifiedDate={new Date((new Date()).getTime() - 10 * 60 * 1000)} />
          <FolderItem name="Photo" onCheckChange={handleCheckChange} modifiedDate={new Date((new Date()).getTime() - 30 * 60 * 1000)} />
          <FolderItem name="Documents" onCheckChange={handleCheckChange} modifiedDate={new Date()} />
          <FolderItem name="Music" onCheckChange={handleCheckChange} modifiedDate={new Date((new Date()).getTime() - 20 * 60 * 1000)} />
          <FolderItem name="Others" onCheckChange={handleCheckChange} modifiedDate={new Date((new Date()).getTime() - 40 * 60 * 1000)} />
        </div>
      </div>
    </div>
  )
}

export default App
