import React from 'react'
import {motion} from 'motion/react'

const NewsLetters = () => {
  return (
    <motion.div 
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6, ease: 'easeOut'}}
    viewport={{once: true, amount: 0.3}}
    className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40">
            <motion.h1
             initial={{opacity: 0, y: 20}}
             whileInView={{opacity: 1, y: 0}}
             transition={{duration: 0.6, delay: 0.2}}
             // SYNC: Added dark:text-white to ensure heading visibility on dark backgrounds
             className="md:text-4xl text-2xl font-semibold dark:text-white">Never Miss a Deal!</motion.h1>
            <motion.p
             initial={{opacity: 0, y: 20}}
             whileInView={{opacity: 1, y: 0}}
             transition={{duration: 0.5, delay: 0.3}}
             // SYNC: Added dark:text-gray-400 for better hierarchy in dark mode
             className="md:text-lg text-gray-500/70 dark:text-gray-400 pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </motion.p>
            <motion.form
             initial={{opacity: 0, y: 20}}
             whileInView={{opacity: 1, y: 0}}
             transition={{delay:0.4, duration: 0.5}}
            
             className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input
                    // SYNC: Added dark:border-gray-600, dark:bg-slate-900, and dark:text-white for consistent input styling
                    className="border border-gray-300 dark:border-gray-600 dark:bg-slate-900 dark:text-white rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                    type="text"
                    placeholder="Enter your email address"
                    required
                />
                <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none">
                    Subscribe
                </button>
            </motion.form>
        </motion.div>
  )
}

export default NewsLetters