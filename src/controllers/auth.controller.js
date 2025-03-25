import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserModel from "../model/user.model.js";
import { ApiError, promiseHandler, ApiResponse } from "../utils/Api-Format.js";

const salt = process.env.BCRYPT_SALT || 10;
const jwtSecrectKey = String(process.env.JWT_SECRET);

export const signupUser = promiseHandler(async (req, res) => {
    const { name, email, password } = req.body; 
    
    if([name, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await UserModel.findOne({ email });

    if(existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(salt));

    const user = await UserModel.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user) {
        return res.status(201).json(
            new ApiResponse(201, "User registered successfully")
        );
    }

    throw new ApiError(409, "User Registration failed");
})

export const loginUser = promiseHandler(async (req, res) => {
    const { email, password } = req.body;

    const existedUser = await UserModel.findOne({ email });

    if(!existedUser) {
        throw new ApiError(400, "User not found");
    }

    const passwordMatch = await bcrypt.compare(password, existedUser.password);
    
    if(passwordMatch) {
        const timeOfLogin = new Date().toISOString();

        existedUser.loginTimes.push(timeOfLogin);
        await existedUser.save();

        const token = jwt.sign({userId: existedUser._id}, jwtSecrectKey, {expiresIn: '2d'});

        res.cookie("acToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 2 * 24 * 60 * 60 * 1000,
        })

        return res.status(201).json(
            new ApiResponse(201, "Logged in successfully", {userId: existedUser._id})
        );
    }

    throw new ApiError(409, "Error occured while Logging in");
})

export const logoutUser = promiseHandler(async (req, res) => {
    res.clearCookie("acToken");
    return res.status(200).json(
        new ApiResponse(200, "Successfully logged out 😏 🍀")
    );
})

export const updateAvatar = promiseHandler(async (req, res) => {
    const { id, image } = req.body;

    const user = await UserModel.findByIdAndUpdate(id, {
        $set: { image: image }
    })

    if(user) {
        return res.status(202).json(
            new ApiResponse(202, "Image updated successfully")
        );
    }
    
    throw new ApiError(400, "Failed to update user image");
});