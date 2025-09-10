import Booking from "../models/Booking.js"
import Vehicle from "../models/Vehicle.js";

// Function to check Availability of Vehicle for a given Date
const checkAvailability  = async (vehicle, pickupDate, returnDate)=>{
    const booking = await Booking.find({
        vehicle,
        pickupDate: {$lte: returnDate},
        returnDate: {$lte: pickupDate},
    })
    return booking.length === 0;
}

// API to Check Availability of Vehicles for the given Date and location
export const checkAvailabilityOfVehicle = async (req, res)=>{
    try {
        const {location, pickupDate, returnDate} = req.body

        // fetch all available vehicles for the given location
        const vehicles = await Vehicle.find({location, isAvailable: true})

        // check vehicle availability for the given date range using promise
        const availableVehiclesPromises = vehicles.map(async (vehicle)=>{
            const isAvailable = await checkAvailability(vehicle._id, pickupDate, returnDate)
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
        const {_id} = req.user;
        const {vehicle, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(vehicle, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success: false, message: "Vehicle is not available"})
        }

        const vehicleData = await Vehicle.findById(vehicle)

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked)/(1000*60*60*24));
        const price  = vehicle.pricePerDay * noOfDays;

        await Booking.create({vehicle, owner:vehicleData.owner, user: _id, pickupDate, returnDate, price})

        res.json({success: true, message: "Booking Created"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to get List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const {_id} = req.user
        const bookings = await Booking.find({user: _id}).populate("vehicle").sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to get Owner Bookings

export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role != 'owner') {
            return res.json({ success: false, message: "Unauthorised"})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate
        ('vehicle user').select('-user.password').sort({createdAt: -1})
        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to change booking status
export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body
        
        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorised"})
        }

        booking.status = status;
        await booking.save()

        res.json({success: true, message: "Status updated"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}