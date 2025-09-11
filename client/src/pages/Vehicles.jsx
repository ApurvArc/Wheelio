import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { assets, dummyVehicleData } from '../assets/assets'
import VehicleCard from '../components/VehicleCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Vehicles = () => {

  // getting search params from url
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const {vehicles, axios} = useAppContext()

  const [input, setInput] = useState("")

  const isSearchData = pickupLocation && pickupDate && returnDate
  const [filteredVehicles, setFilteredVehicles] = useState([])

  const applyFilter = async () => {
    if(input === ''){
      setFilteredVehicles(vehicles)
      return null
    }

    const filtered = vehicles.slice().filter((vehicle)=>{
      return vehicle.brand.toLowerCase().includes(input.toLowerCase())
      || vehicle.model.toLowerCase().includes(input.toLowerCase())
      || vehicle.category.toLowerCase().includes(input.toLowerCase())
      || vehicle.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredVehicles(filtered)
  }

  const searchVehicleAvailability = async () => {
    try {
      const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
      if(data.success){
        setFilteredVehicles(data.availableVehicles)
        if(data.availableVehicles.length === 0){
          toast.error('No vehicles available')
        }
        return null
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isSearchData && searchVehicleAvailability()
  }, [])

  useEffect(() => {
    vehicles.length > 0 && !isSearchData && applyFilter()
  }, [input, vehicles])

  return (
    <div>
      
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Vehicles' subTitle='Browse our selection of vehicles available for your next adventure' />
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12
        rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>

          <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Search by make, model, or features' className='w-full h-full outline-none text-gray-500' />
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
        </div>
      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {filteredVehicles.length} Vehicles</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredVehicles.map((vehicle, index) => (
            <div key={index}>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Vehicles