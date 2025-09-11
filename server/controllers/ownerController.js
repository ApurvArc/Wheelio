import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js"
import Vehicle from "../models/Vehicle.js"
import fs from "fs"

//API to change role to user
export const changeRoleToOwner = async (req, res) =>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: " Now you can list vehicles"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

//API to List Vehicle

export const addVehicle = async (req, res) => {
    try {
        const {_id} = req.user;
        let vehicle = JSON.parse(req.body.vehicleData);
        const imageFile = req.file;

        //Upload Iamge to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/vehicles'
        })

        //optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '1280'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Convert to modern format
            ]
        });

        const image = optimizedImageUrl;
        await Vehicle.create({...vehicle, owner: _id, image})

        res.json({success: true, message: "Vehicle Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to List Owner Vehicles
export const getOwnerVehicles = async (req,res)=> {
    try {
        const {_id} = req.user
        const vehicles = await Vehicle.find({owner: _id})
        res.json({success: true,vehicles})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to toggle Vehicle Availability
export const toggleVehicleAvailabilty = async (req,res)=> {
    try {
        const {_id} = req.user
        const {vehicleId} = req.body
        const vehicle = await Vehicle.findById(vehicleId)

        // Checking is car belongs to the user
        if(vehicle.owner.toString() != _id.toString()){
            return res.json({ success: false, message: "Unauthorized"});
        }

        vehicle.isAvailable = ! vehicle.isAvailable;
        await vehicle.save()

        res.json({success: true, message: "Availablility Toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to delete a vehicle
export const deleteVehicle = async (req,res)=> {
    try {
        const {_id} = req.user
        const {vehicleId} = req.body
        const vehicle = await Vehicle.findById(vehicleId)

        // Checking is car belongs to the user
        if(vehicle.owner.toString() != _id.toString()){
            return res.json({ success: false, message: "Unauthorized"});
        }

        vehicle.owner = null;
        vehicle.isAvailable = false;

        await vehicle.save()

        res.json({success: true, message: "Vehicle Removed"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// API to get Dashboard Data
export const getDashboardData = async (req,res) =>{
    try {
        const {_id, role } = req.user;

        if(role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"});
        }

        const vehicles = await Vehicle.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('vehicle').sort({createdAt: -1})

        const pendingBookings = await Booking.find({owner: _id, status: "pending"})
        const completedBookings = await Booking.find({owner: _id, status: "confirmed"})

        // Calculate monthlyRevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.
        status === 'confirmed').reduce((acc, booking)=> acc + booking
        .price, 0)

        const dashboardData = {
            totalVehicles: vehicles.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3).length,
            monthlyRevenue
        }
        
        res.json({ success: true, dashboardData });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message})
    }
}

// API to update user image
export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        });

        // Optimization through ImageKit URL transformation
        var optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },    // Profile size
                { quality: 'auto' }, // Auto compression
                { format: 'webp' }   // Convert to modern format
            ]
        });

        const image = optimizedImageUrl;
        await User.findByIdAndUpdate(_id, { image });

        res.json({ success: true, message: "Image updated", image });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

