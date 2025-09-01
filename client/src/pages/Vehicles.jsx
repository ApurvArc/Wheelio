import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyVehicleData } from '../assets/assets'
import VehicleCard from '../components/VehicleCard'

const Vehicles = () => {

  const [input, setInput] = useState("")
  return (
    <div>
      
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Vehicles' subTitle='Browse our selection of vehicles available for your next adventure' />
        <div className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12
        rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2'/>

          <input onClick={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Search by make, model, or features' className='w-full h-full outline-none text-gray-500' />
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2'/>
        </div>
      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>Showing {dummyVehicleData.length} Vehicles</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {dummyVehicleData.map((vehicle, index) => (
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
