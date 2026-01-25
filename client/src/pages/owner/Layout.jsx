import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const {isOwner, navigate} = useAppContext()

  useEffect(() => {
    if(!isOwner) {
      navigate('/')
    }
  }, [isOwner])

  return (
    // SYNC: Added min-h-screen and dark:bg-slate-900 to ensure the entire layout 
    // maintains the dark theme background.
    <div className='flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300'>
      <NavbarOwner />
      <div className='flex flex-1'>
        <Sidebar />
        {/* SYNC: The content area (Outlet) will now inherit the dark background 
            from the parent container. */}
        <div className='flex-1 flex flex-col'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout