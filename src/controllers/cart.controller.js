import CartModel from "../model/cart.model.js";
import { promiseHandler, ApiResponse, ApiError } from "../utils/Api-Format.js";

// Get food items in the cart
export const getAllFoodsInCart = promiseHandler(async (req, res) => {
    const { userId } = req.query;

    const existingCart = await CartModel.findOne({ userId });

    if(existingCart) {
        return res.status(200).json(
            new ApiResponse(200, "Cart foods fetched successfully", existingCart)
        );
    }

    throw new ApiError(400, "User dosn't have any cart");
});

// Add to cart
export const addToCart = promiseHandler(async (req, res) => {
    const { foodId, userId } = req.body;

    const existingCart = await CartModel.findOne({ userId });

    if(existingCart) {
        existingCart.cartFoods.push({ foodId });
        const updatedCart = await existingCart.save();

        if(updatedCart) {
            return res.status(202).json(
                new ApiResponse(202, "Food added to cart successfully ")
            );
        }

        throw new ApiError(500, "Failed to update the cart");
    }
    else {
        const newCart = CartModel.create({
            userId,
            cartFoods: [{ foodId }]
        });

        if(newCart) {
            return res.status(201).json(
                new ApiResponse(201, "Food added to cart successfully")
            );
        }

        throw new ApiError(500, "Failed to add the food to the cart");
    }
});

// Remove one item from the cart
export const removeFromCart = promiseHandler(async (req, res) => {
    const { foodId, userId } = req.body;

    const existingCart = await CartModel.findOne({ userId });

    if(existingCart) {
        const index = existingCart.cartFoods.findIndex(f => f.foodId.toString() === foodId);

        if (index !== -1) {
            existingCart.cartFoods.splice(index, 1);

            const updatedCart = await existingCart.save();

            if(updatedCart) {
                return res.status(202).json(
                    new ApiResponse(202, "One item removed from cart successfully")
                );
            }

            throw new ApiError(400, "Failed to remove the item from the cart");
        }

        throw new ApiError(500, "Failed to remove the item from the cart");
    }

    throw new ApiError(500, "User dosn't have any cart");
});

// Remove all same foods from the cart
export const removeAllSameFoodsFromCart = promiseHandler(async (req, res) => {
    const { foodId, userId } = req.body;

    const existingCart = await CartModel.findOne({ userId });

    if(existingCart) {
        const updatedCart = await CartModel.findOneAndUpdate({ userId }, { 
            $pull: {
                cartFoods: { foodId } 
            } 
        });

        if(updatedCart) {
            return res.status(202).json(
                new ApiResponse(202, "All same foods removed from cart")
            );
        }

        throw new ApiError(400, "Failed to remove the same items from the cart");
    }

    throw new ApiError(500, "User dosn't have any cart");
});

// Clear the cart
export const clearCart = promiseHandler(async (req, res) => {
    const { userId } = req.query;

    const deletedCart = await CartModel.findOneAndDelete({ userId });

    if(deletedCart) {
        return res.status(202).json(
            new ApiResponse(202, "Cart cleared successfully")
        );
    }

    throw new ApiError(500, "Failed to clear the cart");
});