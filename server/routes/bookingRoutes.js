import express from "express";
import { changeBookingStatus, checkAvailabilityOfVehicle, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityOfVehicle)
bookingRouter.post('/create', createBooking)
bookingRouter.get('/user', getUserBookings)
bookingRouter.get('/owner', getOwnerBookings)
bookingRouter.post('change-status', changeBookingStatus)

export default bookingRouter;