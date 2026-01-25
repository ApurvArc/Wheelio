import React, { useState } from 'react';
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';
import { motion } from "motion/react";

const Hero = () => {
    const [pickupLocation, setPickupLocation] = useState('');

    const {pickupDate, setPickupDate, returnDate, setReturnDate,
        navigate, cityList
    } = useAppContext();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/vehicles?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate);
    }

    return (
        <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{duration: 0.8}}
        // SYNC: Applied dark:bg-slate-900 for a consistent background and dark:text-white for headings
        className='h-screen flex flex-col items-center justify-center gap-14 bg-light dark:bg-slate-900 text-center transition-colors duration-300'>
            <motion.h1 initial={{y: 50, opacity: 0}}
             animate={{y: 0, opacity: 1}} 
             transition={{duration: 0.8, delay: 0.2}} 
             className='text-4xl md:text-5xl font-semibold dark:text-white'>
                Luxury Vehicles on Rent
            </motion.h1>

            <motion.form
                initial={{scale: 0.95, opacity: 0, y: 50}}
                animate={{scale:1 ,y: 0, opacity: 1}}
                transition={{duration: 0.6, delay: 0.4}}
                onSubmit={handleSearch}
                // SYNC: Form container adapts to dark:bg-slate-800 with no shadow for a cleaner dark look
                className='flex flex-col md:flex-row items-start md:items-center
                justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
                bg-white dark:bg-slate-800 shadow-[0px_8px_20px_rgba(0,0,0,0.1)] dark:shadow-none transition-colors'
            >

                <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>

                    <div className='flex flex-col items-start gap-2'>
                        {/* SYNC: Inputs/Selects use dark:bg-slate-800 and white text */}
                        <select required
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="bg-transparent dark:text-white outline-none cursor-pointer"
                        >
                            <option value="" className="text-gray-800">Pickup Location</option>
                            {cityList.map((city) => (
                                <option key={city} value={city} className="text-gray-800">{city}</option>
                            ))}
                        </select>
                        <p className='px-1 text-sm text-gray-600 dark:text-gray-400'>
                            {pickupLocation ? pickupLocation : 'Please select location'}
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="pickup-date" className="text-gray-800 dark:text-gray-300 font-medium">Pick-up Date</label>
                        <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
                            type="date"
                            id="pickup-date"
                            min={new Date().toISOString().split('T')[0]}
                            // SYNC: Maintained readability for date input in dark mode
                            className="text-sm text-gray-600 dark:text-gray-300 bg-transparent outline-none cursor-pointer"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="return-date" className="text-gray-800 dark:text-gray-300 font-medium">Return Date</label>
                        <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
                            type="date"
                            id="return-date"
                            className='text-sm text-gray-600 dark:text-gray-300 bg-transparent outline-none cursor-pointer'
                            required
                        />
                    </div>

                </div>

                <motion.button
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
                    className="flex items-center justify-center gap-1 px-9 py-3
                    max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full
                    cursor-pointer"
                >
                    <img src={assets.search_icon} alt="search" className="brightness-200" />
                    Search
                </motion.button>

            </motion.form>

            <motion.img
             initial={{y: 100, opacity: 0}}
             animate={{y: 0, opacity: 1}}
             transition={{duration: 0.8, delay: 0.6}}
             src={assets.main_car} alt="vehicle" className="max-h-74" />
        </motion.div>
    );
};

export default Hero;