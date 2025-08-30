import React from 'react'

const Title = ({ title, subtitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center 
      ${align === "left" ? "items-start text-left" : "items-center text-center"}`}
    >
      <h1 className="font-semibold text-4xl md:text-[40px]">{title}</h1>
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">
        {subtitle}
      </p>
    </div>
  )
}

export default Title
