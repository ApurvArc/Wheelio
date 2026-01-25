import React from 'react'

const Title = ({title, subTitle}) => {
  return (
    <div>
      {/* SYNC: Added dark:text-white to ensure the main title is visible in dark mode */}
      <h1 className='font-medium text-3xl text-gray-800 dark:text-white'>{title}</h1>
      
      {/* SYNC: Already using dark:text-gray-300 for the subtitle */}
      <p className='text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2
      max-w-156'>{subTitle}</p>
    </div>
  )
}

export default Title