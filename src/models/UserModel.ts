import mongoose, { Schema, Document } from "mongoose"
import {v4 as uuidv4} from "uuid"

export interface IUser extends Document {
    _id: string
    name:string
    email: string
    password: string
    role: string
}

let UsersSchema = new mongoose.Schema({
    _id: {
        type: String,
        default:uuidv4
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default: 'user'
    }
})

export default mongoose.model<IUser>("users", UsersSchema)
