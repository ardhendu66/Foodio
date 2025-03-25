import express from "express";
import { 
    loginUser, signupUser, logoutUser, updateAvatar 
} from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", signupUser);
router.post("/login", loginUser);

// secured routes
router.post("/logout", authorize, logoutUser);
router.route("/update-avatar").put(authorize, updateAvatar);

export default router;