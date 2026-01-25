import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
// SYNC: Professional icons from lucide-react
import { Sun, Moon } from "lucide-react";

const NavbarOwner = () => {
  // SYNC: Destructure theme and toggleTheme from context
  const { user, theme, toggleTheme } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-borderColor dark:border-gray-700 sticky top-0 z-[100] transition-all duration-300 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-100">
      <Link to="/">
        {/* SYNC: Logo brightness for dark mode visibility */}
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      
      <div className="flex items-center gap-4 sm:gap-6">
        {/* SYNC: Explicit text colors for "Welcome" message */}
        <p className="font-medium max-sm:hidden text-gray-700 dark:text-gray-200">
          Welcome, <span className="text-primary">{user?.name || "Owner"}</span>
        </p>
        
        {/* --- SYNC: Compact Toggle Button (Consistent with User Navbar) --- */}
        <button 
          onClick={toggleTheme} 
          /* SYNC: Size reduced to w-10 h-10 to align with the global Navbar style */
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border shadow-sm
          bg-white border-borderColor text-gray-600
          dark:bg-slate-800 dark:border-gray-700 dark:text-yellow-400"
          title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
           {theme === 'light' ? (
             /* SYNC: Smaller icon size (20) for the compact container */
             <Moon size={20} strokeWidth={2} />
           ) : (
             /* SYNC: Sun icon for dark mode */
             <Sun size={20} strokeWidth={2} />
           )}
        </button>
      </div>
    </div>
  );
};

export default NavbarOwner;