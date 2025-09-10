import imagekit from "../configs/imageKit.js";
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
export const getDashBoardData = async (req,res) =>{
    try {
        const {_id, role } = req.user;

        if(role !== 'owner'){
            return res.json({succuss: false, message: "Unauthorized"});
        }

        const vehicles = await Vehicle.find({owner: _id})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}