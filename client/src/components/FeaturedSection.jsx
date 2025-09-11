import React from 'react'
import Title from './Title'
import { dummyVehicleData, assets } from '../assets/assets'
import VehicleCard from './VehicleCard'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

const FeaturedSection = () => {

  const navigate = useNavigate();

  const {vehicles} = useAppContext();

  return (
    <motion.div 
    initial={{opacity: 0, y: 40}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 1, ease: 'easeOut'}}
    className='flex flex-col items-center py-24 px-6 md:px-16
    lg:px-24 xl:px-32'>

        <motion.div 
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 1,delay: 0.5}}
        >
            <Title 
              title='Featured Vehicles' 
              subtitle='Explore our selection of premium vehicles available for your next adventure' 
              align='center' 
            />
        </motion.div>

        <motion.div
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 1,delay: 0.5}}
         className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8'>
            {
                vehicles.slice(0,6).map((vehicle) => (
                    <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4, ease: 'easeOut'}}
                     key={vehicle._id}>
                        <VehicleCard vehicle={vehicle}/>
                    </motion.div>
                ))
            }
        </motion.div>

        <motion.button 
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.4,delay: 0.6}}
          onClick={()=>{
            navigate('/vehicles'); scrollTo(0,0) 
          }} 
          className='flex items-center justify-center gap-2 px-6 py-2 border
          border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'
        >
            Explore all Vehicles <img src={assets.arrow_icon} alt="arrow" />
        </motion.button>
    </motion.div>
  )
}

export default FeaturedSection
