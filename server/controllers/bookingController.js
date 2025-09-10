import Bookings from "../models/Booking.js"
import Vehicle from "../models/Vehicle.js";

// Function to check Availability of Vehicle for a given Date
const checkAvailability  = async (vehicle, pickupDate, returnDate)=>{
    const bookings = await Bookings.find({
        vehicle,
        pickupDate: {$lte: returnDate},
        returnDate: {$lte: pickupDate},
    })
    return bookings.length === 0;
}

// API to Check Availability of Vehicles for the given Date and location
export const checkAvailabilityOfVehicle = async (req, res)=>{
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available vehicles for the given location
        const vehicles = await Vehicle.find({location, isAvailable: true})

        // check vehicle availability for the given date range using promise
        const availableVehiclesPromises = vehicles.map(async (vehicle)=>{
            const isAvailable = await checkAvailability(CaretPosition._id, pickupDate, returnDate)
            return {...vehicle._doc, isAvailable: isAvailable}
        })

        let availableVehicles = await Promise.all(availableVehiclesPromises)
        availableVehicles = availableVehicles.filter(vehicle => vehicle.isAvailable == true)

        res.json({success: true, availableVehicles})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}