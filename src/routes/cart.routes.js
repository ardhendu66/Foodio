import express from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { 
    getAllFoodsInCart, addToCart, removeFromCart, removeAllSameFoodsFromCart, clearCart 
} from "../controllers/cart.controller.js";
const router = express.Router();

// secured routes
router.route("/get-cart-foods").get(authorize, getAllFoodsInCart);
router.route("/add-to-cart").post(authorize, addToCart);
router.route("/remove-from-cart").delete(authorize, removeFromCart);
router.route("/remove-same-foods-from-cart").delete(authorize, removeAllSameFoodsFromCart);
router.route("/clear-cart").delete(authorize, clearCart);

export default router;