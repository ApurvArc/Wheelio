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
    <div className='flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300'>
      <NavbarOwner />
      <div className='flex flex-1 overflow-hidden'> 
        <Sidebar />
        {/* LAYOUT FIX: Added 'overflow-y-auto overflow-x-hidden' to ensure 
            scrolling happens INSIDE this area, not on the whole page */}
        <div className='flex-1 flex flex-col overflow-y-auto overflow-x-hidden'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout