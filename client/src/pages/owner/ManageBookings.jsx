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
    // SYNC: Added dark:bg-slate-900 for background consistency
    <div className='px-4 pt-10 md:px-10 w-full bg-white dark:bg-slate-900 transition-colors duration-300'>
      <Title 
        title="Manage Bookings" 
        subTitle="Track all customer bookings, approve or cancel requests, and manage bookings statuses." 
      />

      {/* SYNC: Added dark:border-gray-700 and dark:bg-slate-800 for the table container */}
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor dark:border-gray-700 mt-6 bg-white dark:bg-slate-800 transition-all'>
        <table className='w-full border-collapse text-left text-sm text-gray-600 dark:text-gray-300'>
          {/* SYNC: Updated table header text color */}
          <thead className='text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50'>
            <tr>
              <th className='p-3 font-medium'>Vehicle</th>
              <th className='p-3 font-medium max-md-hidden'>Date Range</th>
              <th className='p-3 font-medium'>Total</th>
              <th className='p-3 font-medium max-md-hidden'>Payment</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              // SYNC: Added dark:border-gray-700 and dark:text-gray-400 for rows
              <tr key={index} className='border-t border-borderColor dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-colors'>
                <td className='p-3 flex items-center gap-3'>
                  <img 
                    src={booking.vehicle.image} 
                    alt="" 
                    className='h-12 w-12 aspect-square rounded-md object-cover' 
                  />
                  {/* SYNC: Added dark:text-gray-200 for emphasis */}
                  <p className='font-medium max-md-hidden dark:text-gray-200'>
                    {booking.vehicle.brand} {booking.vehicle.model}
                  </p>
                </td>

                <td className='p-3 max-md-hidden'>
                  {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                </td>

                <td className='p-3 dark:text-gray-200'>{currency}{booking.price}</td>
                
                <td className='p-3 max-md-hidden'>
                  {/* SYNC: Updated payment badge background and text */}
                  <span className='bg-gray-100 dark:bg-slate-900 px-3 py-1 rounded-full text-xs dark:text-gray-400'>offline</span>
                </td>

                <td className='p-3'>
                  {booking.status === 'pending' ? (
                    // SYNC: Added dark styling for the select dropdown
                    <select 
                      onChange={e=> changeBookingStatus(booking._id, e.target.value)} 
                      value={booking.status} 
                      className='px-2 py-1.5 mt-1 text-gray-500 dark:text-gray-300 border border-borderColor dark:border-gray-600 rounded-md outline-none bg-white dark:bg-slate-900'
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    // SYNC: Refined status badges for dark mode with subtle backgrounds
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
  )
}

export default ManageBookings