import { model, models, Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    gmail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "student",
    }
}, { timestamps: true })


export const UserModel = models.User ||
    model("User", userSchema);