import { Checkbox } from "@headlessui/react"
import moment from "moment"
import { useState, useEffect } from "react"
import { Icon } from "./components/ui/icon"

interface ItemProps {
  name: string
  onCheckChange: (checked: boolean) => void
  modifiedDate: Date
  icon: React.ReactNode
}

function Item({ name, onCheckChange, modifiedDate, icon }: ItemProps) {
  const [isChecked, setIsChecked] = useState(false)

  function handleChange(checked: boolean) {
    setIsChecked(checked)
    onCheckChange(checked)
  }

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
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        <Icon name="threeDots" className="w-5 h-5" /> 
      </button>
      {icon}
      <span className="mt-2 text-sm lg:text-base dark:text-white">{name}</span>
      <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">{moment(modifiedDate).fromNow()}</span>
    </div>
  )
}

const FolderItem = (props: Omit<ItemProps, 'icon'>) => (
  <Item {...props} icon={<Icon name="folder" className="w-12 h-12 lg:w-20 lg:h-20" />} />
)

const FileItem = (props: Omit<ItemProps, 'icon'>) => (
  <Item {...props} icon={<Icon name="pdf" className="w-12 h-12 lg:w-20 lg:h-20" />} />
)

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
          <FileItem name="Report.pdf" onCheckChange={handleCheckChange} modifiedDate={new Date((new Date()).getTime() - 5 * 60 * 1000)} />
        </div>
      </div>
    </div>
  )
}

export default App
