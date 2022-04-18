import React from 'react'

function DropdownMenu(props) {
  return (
    <div>
     <div className={props.collapse ? '' : 'hidden'}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                Home
            </a>
            <a className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                Gallery
            </a>
            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                Content
            </a>
            <a className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium" href="/#">
                Contact
            </a>
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu