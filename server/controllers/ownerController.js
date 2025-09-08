import User from "../models/User.js"

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
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}