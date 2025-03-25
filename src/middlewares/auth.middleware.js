import jwt from "jsonwebtoken";
import UserModel from "../model/user.model.js";
import { promiseHandler, ApiError } from "../utils/Api-Format.js";
const jwtSecrectKey = String(process.env.JWT_SECRET);

export const authorize = promiseHandler(async (req, _, next) => {
    const token = req.cookies.acToken;
    // console.log(token);    

    if(!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, jwtSecrectKey);
    // console.log(decodedToken);
    
    const user = await UserModel.findById(decodedToken.userId).select("-password");

    if(!user) {
        throw new ApiError(401, "Invalid access token");
    }
    
    req.user = user;
    console.log(req.user);    
    next();
})