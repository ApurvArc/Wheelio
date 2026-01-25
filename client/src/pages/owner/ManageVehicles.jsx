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
    <div className='flex-1 px-4 py-10 md:px-10 w-full bg-white dark:bg-slate-900 transition-colors duration-300'>

      <Title title="Manage Vehicles" subTitle="View all listed vehicles, update their details, or remove them from the booking platform." />

      <div className='w-full lg:max-w-4xl rounded-md overflow-hidden border border-borderColor dark:border-gray-700 mt-6 bg-white dark:bg-slate-800 transition-all'>
        
        {/* SCROLL FIX: This wrapper allows the table to scroll internally */}
        <div className="overflow-x-auto">
          <table className='w-full border-collapse text-left text-sm text-gray-600 dark:text-gray-300 min-w-[500px]'>
            <thead className='text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-900/50'>
              <tr>
                <th className='p-4 font-medium'>Vehicle</th>
                <th className='p-4 font-medium hidden md:table-cell'>Category</th>
                <th className='p-4 font-medium'>Price</th>
                <th className='p-4 font-medium hidden sm:table-cell'>Status</th>
                <th className='p-4 font-medium text-right'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index} className='border-t border-borderColor dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-900/30 transition-colors'>
                  <td className='p-4 flex items-center gap-3'>
                    <img src={vehicle.image} alt="" className='h-10 w-10 md:h-12 md:w-12 aspect-square rounded-md object-cover flex-shrink-0' />
                    <div>
                      <p className='font-medium dark:text-gray-200 leading-tight'>{vehicle.brand} {vehicle.model}</p>
                      <p className='text-[10px] md:text-xs text-gray-500 dark:text-gray-400'>{vehicle.seating_capacity} Seats • {vehicle.transmission}</p>
                    </div>
                  </td>

                  {/* TYPO FIX: Changed 'max-md-hidden' (invalid) to 'hidden md:table-cell' (valid) */}
                  <td className='p-4 hidden md:table-cell dark:text-gray-400'>{vehicle.category}</td>
                  <td className='p-4 dark:text-gray-200 whitespace-nowrap'>{currency}{vehicle.pricePerDay}/day</td>
                  
                  {/* TYPO FIX: Changed 'max-md-hidden' (invalid) to 'hidden sm:table-cell' (valid) */}
                  <td className='p-4 hidden sm:table-cell'>
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      vehicle.isAvailable 
                        ? 'bg-green-100 dark:bg-green-500/10 text-green-500' 
                        : 'bg-red-100 dark:bg-red-500/10 text-red-500'
                    }`}>
                      {vehicle.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  
                  <td className='p-4'>
                    <div className='flex items-center justify-end gap-5'>
                      <img 
                        onClick={() => toggleAvailability(vehicle._id)} 
                        src={vehicle.isAvailable ? assets.eye_close_icon : assets.eye_icon} 
                        alt="toggle" 
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
    </div>
  )
}

export default ManageVehicles