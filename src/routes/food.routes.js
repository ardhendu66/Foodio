import express from "express";
import { 
    findSingleFood, findAllFoods, createFood, updateFood, deleteFood 
} from "../controllers/food.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const router = express.Router();

// public routes
router.route("/find-food").get(findSingleFood);
router.route("/find-all-foods").get(findAllFoods);

// secured routes
router.route("/create-food").post(authorize, createFood);
router.route("/update-food").put(authorize, updateFood);
router.route("/delete-food").delete(authorize, deleteFood);

export default router;