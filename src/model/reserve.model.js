import { Schema, model } from "mongoose";

const reserveSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reservationDateTime: {
        type: Date,
        required: true,
        unique: true,
    },
    reservationCapacity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const ReservationModel = model("Reservation", reserveSchema);

export default ReservationModel;