import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import VehicleCard from '../components/VehicleCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Vehicles = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { vehicles, axios } = useAppContext()
  const [input, setInput] = useState("")
  const [filteredVehicles, setFilteredVehicles] = useState([])
  const [baseVehicles, setBaseVehicles] = useState([]) 

  const searchVehicleAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', { 
        location: pickupLocation, 
        pickupDate, 
        returnDate 
      })
      if (data.success) {
        setBaseVehicles(data.availableVehicles)
        setFilteredVehicles(data.availableVehicles)
        if (data.availableVehicles.length === 0) {
          toast.error('No vehicles available in this location')
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const applyFilter = () => {
    if (input.trim() === '') {
      setFilteredVehicles(baseVehicles)
      return
    }

    const query = input.toLowerCase()

    const filtered = baseVehicles.filter((vehicle) => {
      return (
        vehicle.brand.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.category.toLowerCase().includes(query) ||
        vehicle.location.toLowerCase().includes(query) ||
        vehicle.transmission.toLowerCase().includes(query) ||
        vehicle.fuel_type.toLowerCase().includes(query)
      )
    })
    setFilteredVehicles(filtered)
  }

  useEffect(() => {
    if (pickupLocation || (pickupDate && returnDate)) {
      searchVehicleAvailability()
    } else {
      setBaseVehicles(vehicles)
      setFilteredVehicles(vehicles)
    }
  }, [pickupLocation, pickupDate, returnDate, vehicles])

  useEffect(() => {
    applyFilter()
  }, [input, baseVehicles])

  return (
    <div className='transition-colors duration-300'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        // SYNC: Applied dark:bg-slate-900 to match the app background depth
        className='flex flex-col items-center py-20 bg-light dark:bg-slate-900 max-md:px-4'>
        <Title title='Available Vehicles' subTitle='Browse our selection of vehicles available for your next adventure' />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          // SYNC: Form container adapts to dark:bg-slate-800
          className='flex items-center bg-white dark:bg-slate-800 px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow-md transition-all'>
          {/* SYNC: Standard brightness adjustment for icon visibility */}
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2 dark:brightness-200'/>
          <input 
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
            type='text' 
            placeholder='Search Location, Brand, Model, or Category' 
            // SYNC: Input text turns white/gray-200 in dark mode
            className='w-full h-full outline-none text-gray-800 dark:text-gray-200 bg-transparent' 
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        {/* SYNC: Result count text dimmed slightly for dark mode hierarchy */}
        <p className='text-gray-500 dark:text-gray-400 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredVehicles.length} Vehicles {pickupLocation && `near ${pickupLocation}`}
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto mb-20'>
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              key={vehicle._id || index}>
              <VehicleCard vehicle={vehicle} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Vehicles