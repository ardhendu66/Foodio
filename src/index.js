import { connectDB } from "./db/db.config.js";
import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log("Error_Express_Connection: ", err);
        throw err;
    })
    app.listen(port, () => {
        console.log(`Server running on... http://localhost:${port}`);
    })
})
.catch(err => {
    console.error('Database connection error: ', err.message);
    process.exit(1);
})