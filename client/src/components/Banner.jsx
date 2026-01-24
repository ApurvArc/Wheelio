import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'
import { useAppContext } from '../context/AppContext' //
import { useNavigate } from 'react-router-dom' //

const Banner = () => {

    const { user, setShowLogin, isOwner, axios, setIsOwner } = useAppContext(); //
    const navigate = useNavigate(); //

    // Functional logic consistent with Navbar.jsx
    const handleButtonClick = async () => {
        if (!user) {
            setShowLogin(true); // Open login if not authenticated
        } else if (isOwner) {
            navigate("/owner"); // Go to dashboard if already an owner
        } else {
            // Logic to change role to owner
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
            className='flex flex-col md:flex-row md:items-start items-center
        justify-between px-8 md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden'>

            <div className='text-white'>
                <h2 className='text-3xl font-medium'>Do You Own a Luxury Vehicle?</h2>
                <p className='mt-2'>Monetize your vehicle effortlessly by listing it on Wheelio.</p>
                <p className='max-w-130'>We take care of insurance, driver verification and secure payments - so you can earn passive income, stress-free.</p>

                <motion.button
                    onClick={handleButtonClick} // Added click handler
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-6 py-2 bg-white hover:bg-slate-100 transition-all
                text-primary rounded-lg text-sm mt-4 cursor-pointer'>
                    {isOwner ? "Manage Your Vehicles" : "List Your Vehicles"}
                </motion.button>
            </div>

            <motion.img
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                src={assets.banner_car_image} alt='vehicle' className='max-h-45 mt-10' />
        </motion.div>
    )
}

export default Banner