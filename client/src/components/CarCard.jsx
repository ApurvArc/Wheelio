import React from 'react'
import { useNavigate } from "react-router-dom"
import { assets } from '../assets/assets'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$"
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate(`/cars-details/${car._id}`)
        window.scrollTo(0, 0)
      }}
      className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer'
    >
      <div className='relative h-48 overflow-hidden'> 
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />

        {car.isAvailable && (
          <p className='absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full'>
            Available Now
          </p>
        )}

        <div className='absolute bottom-4 right-4 bg-black text-white px-3 py-1 rounded-lg'>
          <span className='font-semibold'>
            {currency}{car.pricePerDay}
          </span>
          <span className='text-sm ml-1'>/day</span>
        </div>
      </div>

      <div className='p-4 sm:p-5'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
            <p className='text-muted-foreground text-sm'>{car.category} • {car.year}</p>
          </div>
        </div>

        <div className='mt-4 grid grid-cols-2 text-gray-600'>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.users_icon} alt="Seats" className='h-4 mr-2' />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.fuel_icon} alt="Fuel" className='h-4 mr-2' />
            <span>{car.fuel_type}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.car_icon} alt="Transmission" className='h-4 mr-2' />
            <span>{car.transmission}</span>
          </div>
          <div className='flex items-center text-sm text-muted-foreground'>
            <img src={assets.location_icon} alt="Location" className='h-4 mr-2' />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard
