import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { useLocation, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const {user, axios, fetchUser} =  useAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)
      const {data} = await axios.post('/api/owner/update-image', formData)  
      
      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    // WIDTH FIX: Changed 'max-w-13' (invalid) to 'w-16' (valid). Added 'shrink-0'.
    <div className='relative min-h-screen flex flex-col items-center pt-8
    w-16 md:w-60 shrink-0 border-r border-borderColor dark:border-gray-700 bg-white dark:bg-slate-900 text-sm transition-all'>
      
      <div className='group relative'>
        <label htmlFor="image">
          <img 
            src={
              image 
                ? URL.createObjectURL(image) 
                : user?.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            } 
            alt="profile" 
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover"
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
          className='absolute top-0 right-0 flex items-center gap-1 px-3 py-1 bg-primary/10
          text-primary cursor-pointer rounded-md'
          onClick={updateImage}
        >
          Save 
          <img src={assets.check_icon} width={13} alt=""/>
        </button>
      )}

      <p className='mt-2 text-base max-md:hidden dark:text-white'>{user?.name}</p>

      <div className='w-full'>
        {ownerMenuLinks.map((link,index) => (
          <NavLink 
            key={index} 
            to={link.path} 
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 transition-colors ${
              link.path === location.pathname 
                ? 'bg-primary/10 text-primary' 
                : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary'
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