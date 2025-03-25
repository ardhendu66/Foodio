import express from "express";
import { reserveTable, getReservation } from "../controllers/reserve.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const router = express.Router();

// secured routes
router.route("/get-reservation").get(authorize, getReservation);
router.route("/reserve-table").post(authorize, reserveTable);

export default router;