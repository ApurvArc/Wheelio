import express from "express";
import { addVehicle, changeRoleToOwner, deleteVehicle, getOwnerVehicles, toggleVehicleAvailabilty } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner)
ownerRouter.post("/add-vehicle", upload.single("image"), protect, addVehicle)
ownerRouter.get("/vehicles", protect, getOwnerVehicles)
ownerRouter.post("/toogle-vehicle", protect, toggleVehicleAvailabilty)
ownerRouter.post("/delete-vehicle", protect, deleteVehicle)


export default ownerRouter