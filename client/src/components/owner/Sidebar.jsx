import React, { useState } from 'react'
import { dummyUserData, assets, ownerMenuLinks } from '../../assets/assets'
import { useLocation, NavLink } from 'react-router-dom'

const Sidebar = () => {
  const user = dummyUserData
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    user.image = URL.createObjectURL(image)
    setImage('')
  }

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8
    max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
      
      <div className='group relative'>
        <label htmlFor="image">
          <img 
            src={
              image 
                ? URL.createObjectURL(image) 
                : user.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            } 
            alt="profile" 
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
          />
          <input 
            type="file" 
            id="image" 
            accept="image/*" 
            hidden 
            onChange={(e) => setImage(e.target.files[0])} 
          />

          <div className='absolute hidden top-0 right-0 left-0 bottom-0
          bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer'>
            <img src={assets.edit_icon} alt="edit" className="w-5 h-5"/>
          </div>
        </label>
      </div>

      {image && (
        <button 
          onClick={updateImage}
          className='absolute top-0 right-0 flex items-center gap-1 px-3 py-1 bg-primary/10
          text-primary cursor-pointer rounded-md'
        >
          Save 
          <img src={assets.check_icon} width={13} alt="save"/>
        </button>
      )}

      <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link,index) => (
          <NavLink 
            key={index} 
            to={link.path} 
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'
            }`}
          >
            <img 
              src={link.path === location.pathname ? link.coloredIcon : link.icon}
              alt={link.name} 
            />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='bg-primary h-8 w-1 rounded-r absolute right-0 top-1/2 -translate-y-1/2'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
