import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ManageVehicles = () => {

  const { isOwner, axios, currency } = useAppContext()
  const [vehicles, setVehicles] = useState([])

  const fetchOwnerVehicles = async () => {
    try {
      const { data } = await axios.get('/api/owner/vehicles')
      if (data.success) {
        setVehicles(data.vehicles)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (vehicleId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-vehicle', { vehicleId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerVehicles()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteVehicle = async (vehicleId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this vehicle?')
      if (!confirm) return null

      const { data } = await axios.post('/api/owner/delete-vehicle', { vehicleId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerVehicles()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerVehicles()
  }, [isOwner])

  return (
    // SYNC: Added dark:bg-slate-900 for background consistency
    <div className='px-4 pt-10 md:px-10 w-full bg-white dark:bg-slate-900 transition-colors duration-300'>

      <Title title="Manage Vehicles" subTitle="View all listed vehicles, update their details, or remove them from the booking platform." />

      {/* SYNC: Added dark:border-gray-700 and dark:bg-slate-800 for the table container */}
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor dark:border-gray-700 mt-6 bg-white dark:bg-slate-800 transition-all'>

        <table className='w-full border-collapse text-left text-sm text-gray-600 dark:text-gray-300'>
          {/* SYNC: Updated table header background and text color */}
          <thead className='text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50'>
            <tr>
              <th className='p-3 font-medium'>Vehicle</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((vehicle, index) => (
              // SYNC: Added dark:border-gray-700 and hover effects for dark mode
              <tr key={index} className='border-t border-borderColor dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-colors'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={vehicle.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                  <div className='max-md:hidden'>
                    {/* SYNC: Added dark:text-gray-200 for car details */}
                    <p className='font-medium dark:text-gray-200'>{vehicle.brand} {vehicle.model}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>{vehicle.seating_capacity} Seats • {vehicle.transmission}</p>
                  </div>
                </td>

                <td className='p-3 max-md-hidden dark:text-gray-400'>{vehicle.category}</td>
                <td className='p-3 dark:text-gray-200'>{currency}{vehicle.pricePerDay}/day</td>
                
                <td className='p-3 max-md-hidden'>
                  {/* SYNC: Refined status badges for dark mode with subtle background transparency */}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vehicle.isAvailable 
                      ? 'bg-green-100 dark:bg-green-500/10 text-green-500' 
                      : 'bg-red-100 dark:bg-red-500/10 text-red-500'
                  }`}>
                    {vehicle.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                
                <td className='p-3'>
                  <div className='flex items-center gap-3'>
                    {/* SYNC: Icons maintain original colors without invert; added brightness for dark mode visibility */}
                    <img 
                      onClick={() => toggleAvailability(vehicle._id)} 
                      src={vehicle.isAvailable ? assets.eye_close_icon : assets.eye_icon} 
                      alt="toggle visibility" 
                      className='cursor-pointer w-5 hover:scale-110 transition-transform dark:brightness-125 dark:invert' 
                    />
                    <img 
                      onClick={() => deleteVehicle(vehicle._id)} 
                      src={assets.delete_icon} 
                      alt="delete" 
                      className='cursor-pointer w-5 hover:scale-110 transition-transform dark:brightness-125 dark:invert' 
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageVehicles