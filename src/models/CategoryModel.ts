import mongoose, { Schema, Document } from "mongoose"
import {v4 as uuidv4} from "uuid"

export interface ICategory extends Document {
    _id: string
    title:string
}

let CategoriesSchema = new mongoose.Schema({
    _id: {
        type: String,
        default:uuidv4
    },
    title: {
        type: String,
        requried:true,
        unique:true
    },
})

export default mongoose.model<ICategory>("category", CategoriesSchema)
