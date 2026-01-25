import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast' 
import {motion} from 'motion/react'

const MyBookings = () => {

  const {axios, user, currency} = useAppContext()
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const {data} = await axios.get('/api/bookings/user')
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <motion.div 
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y: 0}}
    transition={{duration: 0.6 }}
    // SYNC: Added dark text color for main container
    className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl dark:text-gray-200'>
      <Title 
        title='My Bookings' 
        subTitle='View and manage all your vehicle bookings' 
        align="left"
      />

      <div>
        {bookings.map((booking, index) => (
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{delay: index * 0.1, duration: 0.4 }}
            key={booking._id} 
            // SYNC: border-borderColor -> dark:border-gray-700
            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor dark:border-gray-700 rounded-lg mt-5 first:mt-12 transition-colors'
          >

            {/* Vehicle Image + Info */}
            <div className='md:col-span-1'>
              <div className='rounded-md overflow-hidden mb-3'>
                <img 
                  src={booking.vehicle.image} 
                  alt="" 
                  className='w-full h-auto aspect-video object-cover'
                />
              </div>
              {/* SYNC: Added dark text color for heading */}
              <p className='text-lg font-medium mt-2 dark:text-white'>
                {booking.vehicle.brand} {booking.vehicle.model}
              </p>
              {/* SYNC: text-gray-500 -> dark:text-gray-400 */}
              <p className='text-gray-500 dark:text-gray-400'>
                {booking.vehicle.year} • {booking.vehicle.category} • {booking.vehicle.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                {/* SYNC: bg-light -> dark:bg-slate-800 */}
                <p className='px-3 py-1.5 bg-light dark:bg-slate-800 rounded dark:text-gray-300'>Booking #{index + 1}</p>
                <p 
                  className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === "confirmed" 
                      ? "bg-green-400/15 text-green-600 dark:text-green-400" 
                      : "bg-red-400/15 text-red-600 dark:text-red-400"
                  }`}
                >
                  {booking.status}
                </p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                {/* SYNC: Kept colored icon without invert as per preference */}
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  {/* SYNC: text-gray-500 -> dark:text-gray-400 */}
                  <p className='text-gray-500 dark:text-gray-400'>Rental Period</p>
                  <p className='dark:text-gray-200'>{booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1'/>
                <div>
                  {/* SYNC: text-gray-500 -> dark:text-gray-400 */}
                  <p className='text-gray-500 dark:text-gray-400'>Pickup Location</p>
                  <p className='dark:text-gray-200'>{booking.vehicle.location}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
             <div className='text-sm text-gray-500 dark:text-gray-400 text-right'>
              <p>Total Price</p>
              <h1 className='text-2xl font-semibold text-primary'>{currency}{booking.price}</h1>
              <p className='mt-1'>Booked on {booking.createdAt.split('T')[0]}</p>
             </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyBookings