import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const { user, setShowLogin, isOwner, axios, setIsOwner } = useAppContext();
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        if (!user) {
            setShowLogin(true); 
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            /* SYNC: Maintained the blue gradient. 
               Added dark:from-[#0446cc] dark:to-[#1e293b] to deepen the section slightly in dark mode 
               for better integration with the slate-900 global background. */
            className='flex flex-col md:flex-row md:items-start items-center justify-between 
            px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] 
            dark:from-[#0446cc] dark:to-[#1e3a8a]/50 max-w-6xl mx-3 md:mx-auto 
            rounded-2xl overflow-hidden transition-colors duration-300'
        >

            <div className='text-white'>
                <h2 className='text-3xl font-medium'>Do You Own a Luxury Vehicle?</h2>
                <p className='mt-2 text-white/90'>Monetize your vehicle effortlessly by listing it on Wheelio.</p>
                <p className='max-w-130 text-white/80'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.</p>

                <motion.button
                    onClick={handleButtonClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    /* SYNC: Added dark:bg-slate-100 and dark:text-blue-700 
                       to keep the button crisp against the deeper dark-mode gradient. */
                    className='px-6 py-2 bg-white dark:bg-slate-100 hover:bg-slate-100 
                    transition-all text-primary dark:text-blue-700 rounded-lg text-sm 
                    font-medium mt-4 cursor-pointer shadow-md'
                >
                    {isOwner ? "Manage Your Vehicles" : "List Your Vehicles"}
                </motion.button>
            </div>

            <motion.img
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                /* SYNC: Car image remains original. Added drop-shadow 
                   to help the car "pop" against the darker background. */
                src={assets.banner_car_image} 
                alt='vehicle' 
                className='max-h-45 mt-10 filter drop-shadow-2xl' 
            />
        </motion.div>
    )
}

export default Banner