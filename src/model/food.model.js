import { Schema, model } from "mongoose";

const foodRatingsReviewsSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    review: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});

const foodSchema = new Schema({
    foodTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    foodDescription: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    foodImages: {
        type: [String],
        required: true,
        trim: true,
        default: [""],
    },
    foodCategory: {
        type: String,
        required: true,
        trim: true,
    },
    foodPrice: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
        max: [10000, "Maximum Price Limit is ₹10,000"],
    },
    foodDiscount: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    foodStock: {
        type: Number,
        required: true,
        min: 0,
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    foodRatingsReviews: {
        type: [foodRatingsReviewsSchema],
    },
}, {
    timestamps: true,
});

const FoodModel = model("Food", foodSchema);

export default FoodModel;