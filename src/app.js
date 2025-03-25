import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import foodRouter from "./routes/food.routes.js";
import cartRouter from "./routes/cart.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1/auth/user", authRouter);
app.use("/api/v1/foodio", foodRouter);
app.use("/api/v1/user/cart", cartRouter);