import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyVehicleData } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const VehicleDetails = () => {

  const { id } = useParams()
  const {vehicles, axios, pickupDate, setPickupDate, returnDate, setReturnDate, user, setShowLogin} = useAppContext()
  const navigate = useNavigate()
  const [vehicle, setVehicle] = useState(null)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/bookings/create', {vehicle: id, pickupDate, returnDate})
      
      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setVehicle(vehicles.find(vehicle => vehicle._id === id))
  }, [vehicles, id])

  return vehicle ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      {/* Back button */}
      <button
        onClick={() => navigate("/vehicles")}
        className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'
      >
        <img src={assets.arrow_icon} alt="" className='rotate-180 opacity-65'/>
        Back to all Vehicles
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        
        {/* Left: Car Image & Details */}
        <div className='lg:col-span-2'>
          <img
            src={vehicle.image}
            alt=""
            className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md'
          />
          <div className='space-y-6'>
            <div>
              <h1>{vehicle.brand} {vehicle.model}</h1>
              <p className='text-gray-500 text-lg'>{vehicle.category} • {vehicle.year}</p>
            </div>

            <hr className='border-border-color my-6'/>

            {/* Vehicle info icons */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.fuel_icon, text: `${vehicle.seating_capacity} Seats` },
                { icon: assets.users_icon, text: vehicle.fuel_type },
                { icon: assets.car_icon, text: vehicle.transmission },
                { icon: assets.location_icon, text: vehicle.location },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className='flex flex-col items-center bg-light p-4 rounded-lg'
                >
                  <img src={item.icon} alt="" className='h-5 mb-2'/>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{vehicle.description}</p>
            </div>

            {/* Features */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear View Mirror"].map((feature, idx) => (
                  <li key={idx} className='flex items-center text-gray-500'>
                    <img src={assets.check_icon} alt="" className='h-4 mr-2'/>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Booking Form */}
        <form
          onSubmit={handleSubmit}
          className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'
        >
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}{vehicle.pricePerDay}
            <span className='text-base text-gray-400 font-normal'>per day</span>
          </p>

          <hr className='border-borderColor my-6'/>

          <div className='flex flex-col gap-2'>
            <label htmlFor="pickup-date">Pickup Date</label>
            <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="return-date">Return Date</label>
            <input value ={returnDate} onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id="return-date"
              min={pickupDate}
            />
          </div>

          <button
            type="submit"
            className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'
          >
            Book Now
          </button>

          <p className='text-center text-sm'>No credit card required to reserve</p>
        </form>
      </div>
    </div>
  ) : <Loader/>
}

export default VehicleDetails