import { Schema, model } from "mongoose";

const partialCartSchema = new Schema({
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    //     type: Number,
    //     required: true,
    //     default: 1
    // }
}, {
    _id: false,
    timestamps: true,
});

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartFoods: {
        type: Array(partialCartSchema),
        required: true,
    }
}, {
    timestamps: true,
});

const CartModel = model("Cart", cartSchema);

export default CartModel;