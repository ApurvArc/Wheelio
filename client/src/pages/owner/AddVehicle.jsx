import React, { useState } from 'react'
import { assets, indianCities } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'


const AddVehicle = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)

  const [vehicle, setVehicle] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData  = new FormData()
      formData.append('image', image)
      formData.append('vehicleData', JSON.stringify(vehicle))

      const {data} = await axios.post('/api/owner/add-vehicle', formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setVehicle({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Vehicle"
        subTitle="Fill in details to list a new vehicle for booking, including pricing, availability, and vehicle specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Vehicle Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="vehicle-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="vehicle-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">Upload a picture of your vehicle</p>
        </div>

        {/* Vehicle Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={vehicle.brand}
              onChange={(e) =>
                setVehicle({ ...vehicle, brand: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4..."
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={vehicle.model}
              onChange={(e) =>
                setVehicle({ ...vehicle, model: e.target.value })
              }
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Year</label>
            <input
              type="number"
              placeholder="2025"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={vehicle.year}
              onChange={(e) =>
                setVehicle({ ...vehicle, year: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Day Price ({currency})</label>
            <input
              type="number"
              placeholder="100"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={vehicle.pricePerDay}
              onChange={(e) =>
                setVehicle({ ...vehicle, pricePerDay: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) =>
                setVehicle({ ...vehicle, category: e.target.value })
              }
              value={vehicle.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              onChange={(e) =>
                setVehicle({ ...vehicle, transmission: e.target.value })
              }
              value={vehicle.transmission}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              onChange={(e) =>
                setVehicle({ ...vehicle, fuel_type: e.target.value })
              }
              value={vehicle.fuel_type}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Fuel Type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={vehicle.seating_capacity}
              onChange={(e) =>
                setVehicle({ ...vehicle, seating_capacity: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full">
          <label>Location</label>
          <select
            onChange={(e) =>
              setVehicle({ ...vehicle, location: e.target.value })
            }
            value={vehicle.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          >
            <option value="">Select a Location</option>
            {indianCities.map((city) => (
                <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            required
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={vehicle.description}
            onChange={(e) =>
              setVehicle({ ...vehicle, description: e.target.value })
            }
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer"
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List Your Vehicle'}
        </button>
      </form>
    </div>
  )
}

export default AddVehicle