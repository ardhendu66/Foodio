import ReservationModel from "../model/reserve.model.js";
import { promiseHandler, ApiResponse, ApiError } from "../utils/Api-Format.js";

// Find Reservation
export const getReservation = promiseHandler(async (req, res) => {
    const reservations = ReservationModel.find().populate("userId");

    if(!reservations) {
        throw new ApiError(404, "No reservation found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Reservations found 😏 🍀", reservations)
    );
});

// Reserve Table
export const reserveTable = promiseHandler(async (req, res) => {
    const { userId, reservationDateTime, reservationCapacity } = req.body;

    const reservation = ReservationModel.create({
        userId, 
        reservationDateTime: new Date(String(reservationDateTime)), 
        reservationCapacity,
    });

    if(!reservation) {
        throw new ApiError(400, "Failed to reserve a table");
    }

    return res.status(201).json(
        new ApiResponse(201, "Table reserved successfully 😏 🍀")
    );
});