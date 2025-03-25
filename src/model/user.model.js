import { Schema, model } from "mongoose";
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,100}$/;

const userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
        validate: {
            validator: (value) => passwordRegex.test(value),
            message: ({value}) => `Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, no space and its length can from 8 to 100`
        },
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        default: "https://media.licdn.com/dms/image/D4E03AQHfEqZnLFBDRw/profile-displayphoto-shrink_800_800/0/1670861970872?e=1727308800&v=beta&t=rSCS76iyAovm0tINNrf4w1bwcdovruqggSYOGvYKXIQ"
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    emailVerificationToken: {
        type: String,
    },
    forgotPasswordToken: {
        type: String,
    },
    collections_of_foods: {
        type: [Object],
    },
    loginTimes: {
        type: [Date],
    }
}, {
    timestamps: true,
})

const UserModel = model("User", userschema);

export default UserModel;