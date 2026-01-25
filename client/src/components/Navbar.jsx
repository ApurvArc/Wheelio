import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
// SYNC: Professional icons
import { Sun, Moon } from "lucide-react";

const Navbar = () => {

  const {setShowLogin, user, logout, isOwner, axios, setIsOwner, theme, toggleTheme} = useAppContext()

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changeRole = async () => {
    try {
      const {data} = await axios.post('/api/owner/change-role')
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <motion.div
    initial = {{y: -20, opacity: 0}}
    animate = {{y: 0, opacity: 1}}
    transition={{duration: 0.5}}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor dark:border-gray-700 relative transition-all z-[100] ${
        location.pathname === "/" ? "bg-light dark:bg-slate-900" : "bg-white dark:bg-slate-900"
      } text-gray-600 dark:text-gray-200`}
    >
      <Link to="/">
        <motion.img whileHover={{scale: 1.05}} src={assets.logo} alt="logo" className="h-8" />
      </Link>

      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-borderColor dark:border-gray-700 right-0 flex flex-col
        sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
          location.pathname === "/" ? "bg-light dark:bg-slate-900" : "bg-white dark:bg-slate-900"
        } ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
            {link.name}
          </Link>
        ))}
        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button onClick={() => isOwner ? navigate("/owner") : changeRole()} className="cursor-pointer hover:text-primary transition-colors">
            {isOwner ? "Dashboard" : "List Vehicles"}
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {user ? logout() : setShowLogin(true)}}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dill transition-all text-white rounded-lg"
            >
              {user ? "Logout" : "Login"}
            </button>

            {/* --- REFINED: Smaller Toggle Button aligned with Login --- */}
            <button 
              onClick={toggleTheme} 
              /* SYNC: Reduced size to w-10 h-10 for better alignment */
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border shadow-sm
              bg-white border-borderColor text-gray-600
              dark:bg-slate-800 dark:border-gray-700 dark:text-yellow-400"
              title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
               {theme === 'light' ? (
                 <Moon size={20} strokeWidth={2} />
               ) : (
                 <Sun size={20} strokeWidth={2} />
               )}
            </button>
          </div>

        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer z-50"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="h-6 w-6 dark:brightness-200 transition-all" 
        />
      </button>
    </motion.div>
  );
};

export default Navbar;