import React from 'react'

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center 
      ${align === "left" ? "items-start text-left" : "items-center text-center"}`}
    >
      {/* SYNC: Added dark:text-white to ensure heading visibility on dark backgrounds */}
      <h1 className="font-semibold text-4xl md:text-[40px] text-gray-800 dark:text-white transition-colors">
        {title}
      </h1>
      
      {/* SYNC: Added dark:text-gray-400 for better hierarchy in dark mode */}
      <p className="text-sm md:text-base text-gray-500/90 dark:text-gray-400 mt-2 max-w-156 transition-colors">
        {subTitle}
      </p>
    </div>
  )
}

export default Title