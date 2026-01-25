import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      {/* SYNC: Added dark:border-gray-700 to ensure the spinning ring is visible against dark backgrounds */}
      <div className='animate-spin rounded-full h-14 w-14
      border-4 border-gray-300 dark:border-gray-700 border-t-primary'></div>
    </div>
  )
}

export default Loader