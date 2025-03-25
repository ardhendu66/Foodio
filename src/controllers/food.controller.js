import FoodModel from "../model/food.model.js";
import { promiseHandler, ApiError, ApiResponse } from "../utils/Api-Format.js";

export const findAllFoods = promiseHandler(async (req, res) => {
    const foods = await FoodModel.find({});

    if(foods.length > 0) {
        return res.status(200).json(
            new ApiResponse(200, "Foods fetched successfully 😏 🍀", foods)
        );
    }

    throw new ApiError(404, "No Foods found.");
});

export const findSingleFood = promiseHandler(async (req, res) => {
    const { foodId } = req.query;

    const food = await FoodModel.findById(foodId);

    if(food) {
        return res.status(200).json(
            new ApiResponse(200, "Food fetched successfully 😏 🍀", food)
        );
    }

    throw new ApiError(404, "Food not found.");
});


export const createFood = promiseHandler(async (req, res) => {
    const {
        foodTitle, 
        foodDescription, 
        foodImages, 
        foodCategory, 
        foodPrice, 
        foodDiscount, 
        foodStock, 
        adminId 
    } = req.body;

    if(
        [
            foodTitle, 
            foodDescription, 
            foodImages, 
            foodCategory, 
            foodPrice, 
            foodDiscount, 
            foodStock, 
            adminId 
        ]
        .some(field => String(field)?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const food = await FoodModel.create({
        foodTitle,
        foodDescription,
        foodImages,
        foodCategory,
        foodPrice,
        foodDiscount,
        foodStock,
        adminId
    });

    if(food) {
        return res.status(201).json(
            new ApiResponse(201, "Food added successfully 😏 🍀")
        );
    }

    throw new ApiError(409, "Food addition failed somehow.");
});


export const updateFood = promiseHandler(async (req, res) => {
    const { 
        foodId,
        foodTitle, 
        foodDescription, 
        foodImages, 
        foodCategory, 
        foodPrice, 
        foodDiscount, 
        foodStock, 
        // adminId 
    } = req.body;

    if(
        [
            foodId,
            foodTitle, 
            foodDescription, 
            foodImages, 
            foodCategory, 
            foodPrice, 
            foodDiscount, 
            foodStock, 
            // adminId 
        ]
        .some(field => String(field)?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const food = await FoodModel.findByIdAndUpdate(foodId, {
        $set: {
            foodTitle,
            foodDescription,
            foodImages,
            foodCategory,
            foodPrice,
            foodDiscount,
            foodStock,
            // adminId
        }
    });

    if(food) {
        return res.status(202).json(
            new ApiResponse(202, "Food updated successfully 😏 🍀")
        );
    }

    throw new ApiError(409, "Food updation failed somehow.");
});


export const deleteFood = promiseHandler(async (req, res) => {
    const { foodId } = req.query;

    const food = await FoodModel.findByIdAndDelete(foodId);

    if(food) {
        return res.status(202).json(
            new ApiResponse(202, "Food deleted successfully 😏 🍀")
        );
    }

    throw new ApiError(409, "Food deletion failed somehow.");
});