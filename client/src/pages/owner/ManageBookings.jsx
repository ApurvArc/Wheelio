import React, { useEffect, useState } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageBookings = () => {

  const {isOwner, currency, axios} = useAppContext()

  const [bookings, setBookings] = useState([])

  const fetchOwnerBookings = async () => {
    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const {data} = await axios.post('/api/bookings/change-status', {bookingId, status})
      if(data.success){
        toast.success(data.message)
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerBookings()
  }, [isOwner])

  return (
    // FIX 1: Use 'flex-1' and 'py-10' to match the Layout structure
    <div className='flex-1 px-4 py-10 md:px-10 w-full bg-white dark:bg-slate-900 transition-colors duration-300'>
      <Title 
        title="Manage Bookings" 
        subTitle="Track all customer bookings, approve or cancel requests, and manage bookings statuses." 
      />

      {/* FIX 2: Increased max-width to lg:max-w-4xl for better spacing on desktop */}
      <div className='w-full lg:max-w-4xl rounded-md overflow-hidden border border-borderColor dark:border-gray-700 mt-6 bg-white dark:bg-slate-800 transition-all'>
        
        {/* FIX 3: Added 'overflow-x-auto' to allow horizontal scrolling on mobile */}
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse text-left text-sm text-gray-600 dark:text-gray-300 min-w-[500px]'>
            <thead className='text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50'>
              <tr>
                <th className='p-4 font-medium'>Vehicle</th>
                {/* FIX 4: Corrected 'max-md-hidden' typo to 'hidden md:table-cell' */}
                <th className='p-4 font-medium hidden md:table-cell'>Date Range</th>
                <th className='p-4 font-medium'>Total</th>
                {/* FIX 5: Corrected typo */}
                <th className='p-4 font-medium hidden md:table-cell'>Payment</th>
                <th className='p-4 font-medium'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className='border-t border-borderColor dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-colors'>
                  <td className='p-4 flex items-center gap-3'>
                    <img 
                      src={booking.vehicle.image} 
                      alt="" 
                      className='h-10 w-10 aspect-square rounded-md object-cover' 
                    />
                    {/* FIX 6: Removed 'max-md-hidden' so vehicle name is visible on mobile */}
                    <p className='font-medium dark:text-gray-200 whitespace-nowrap'>
                      {booking.vehicle.brand} {booking.vehicle.model}
                    </p>
                  </td>

                  <td className='p-4 hidden md:table-cell'>
                    {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                  </td>

                  <td className='p-4 dark:text-gray-200 font-medium'>{currency}{booking.price}</td>
                  
                  <td className='p-4 hidden md:table-cell'>
                    <span className='bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-gray-700 px-3 py-1 rounded-full text-xs dark:text-gray-400'>
                      offline
                    </span>
                  </td>

                  <td className='p-4'>
                    {booking.status === 'pending' ? (
                      <select 
                        onChange={e=> changeBookingStatus(booking._id, e.target.value)} 
                        value={booking.status} 
                        className='px-2 py-1.5 text-xs md:text-sm text-gray-500 dark:text-gray-300 border border-borderColor dark:border-gray-600 rounded-md outline-none bg-white dark:bg-slate-900 cursor-pointer'
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 dark:bg-green-500/10 text-green-500' 
                          : 'bg-red-100 dark:bg-red-500/10 text-red-500'
                      }`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageBookings