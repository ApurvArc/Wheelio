import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Footer = () => {
  const { user, setShowLogin, isOwner, axios, setIsOwner } = useAppContext();
  const navigate = useNavigate();

  const handleListVehicleClick = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowLogin(true);
      window.scrollTo(0, 0);
    } else if (isOwner) {
      navigate("/owner");
    } else {
      try {
        const { data } = await axios.post('/api/owner/change-role');
        if (data.success) {
          setIsOwner(true);
          navigate("/owner");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      // SYNC: Refined text colors for standard gray in light and light-gray in dark mode
      className='px-6 md:px-16 lg:px-24 xl:px-24 mt-16 text-sm text-gray-600 dark:text-gray-400'
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        // SYNC: Border color updated to match theme depth
        className='flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor dark:border-gray-700 border-b'
      >
        <div className='max-w-80'>
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              // Removed dark:invert; logo will maintain original colors
              src={assets.logo} alt="logo" className='mb-4 h-8 md:h-9'
            />
          </Link>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='max-w-80 mt-3'
          >
            Luxury vehicle rental service with a premium selection of vehicles to suit your every need.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className='flex items-center gap-3 mt-6'
          >
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                <img src={assets.facebook_logo} className='w-5 h-5 hover:scale-110 transition-transform' alt="Facebook" />
            </a>
            <a href='https://x.com/home' target='_blank' rel='noopener noreferrer'>
                <img src={assets.twitter_logo} className='w-5 h-5 hover:scale-110 transition-transform' alt="Twitter" />
            </a>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                <img src={assets.instagram_logo} className='w-5 h-5 hover:scale-110 transition-transform' alt="Instagram" />
            </a>
            <a href='mailto:wheelio@bitmail.com'>
                <img src={assets.gmail_logo} className='w-5 h-5 hover:scale-110 transition-transform' alt="Email" />
            </a>
          </motion.div>
        </div>

        <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.4 }}
         className='flex flex-wrap justify-between w-full md:w-1/2 gap-8'>
          <div>
            {/* SYNC: Titles turn white in dark mode for better hierarchy */}
            <h2 className='text-base font-medium text-gray-800 uppercase dark:text-white'>Quick Links</h2>
            <ul className='mt-3 flex flex-col gap-1.5'>
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>Home</Link></li>
              <li><Link to="/vehicles" onClick={() => window.scrollTo(0, 0)} className='hover:text-primary transition-colors'>Browse Vehicles</Link></li>
              <li>
                <button onClick={handleListVehicleClick} className='hover:text-primary transition-colors text-left cursor-pointer'>
                  {isOwner ? "Owner Dashboard" : "List Your Vehicles"}
                </button>
              </li>
              <li><span className='hover:text-primary transition-colors cursor-pointer'>About Us</span></li>
            </ul>
          </div>

          <div>
            <h2 className='text-base font-medium text-gray-800 uppercase dark:text-white'>Resources</h2>
            <ul className='mt-3 flex flex-col gap-1.5'>
              <li><span className='hover:text-primary transition-colors cursor-pointer'>Help Center</span></li>
              <li><span className='hover:text-primary transition-colors cursor-pointer'>Terms of Service</span></li>
              <li><span className='hover:text-primary transition-colors cursor-pointer'>Privacy Policy</span></li>
              <li><span className='hover:text-primary transition-colors cursor-pointer'>Insurance</span></li>
            </ul>
          </div>

          <div>
            <h2 className='text-base font-medium text-gray-800 uppercase dark:text-white'>Contact</h2>
            <ul className='mt-3 flex flex-col gap-1.5'>
              <li className='dark:text-gray-400'>Bit Gate</li>
              <li className='dark:text-gray-400'>Mesra, Ranchi, Pincode-835215</li>
              <li className='dark:text-gray-400'>+91 7238289323</li>
              <li className='text-primary font-medium'>wheelio@bitmail.com</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className='flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-gray-500 dark:text-gray-400'>
        <p>© {new Date().getFullYear()} Wheelio. All rights reserved.</p>
        <ul className='flex items-center gap-4'>
          <li className='hover:underline cursor-pointer'>Privacy</li>
          <li>|</li>
          <li className='hover:underline cursor-pointer'>Terms</li>
          <li>|</li>
          <li className='hover:underline cursor-pointer'>Cookies</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Footer