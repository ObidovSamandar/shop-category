import mongoose, { Schema, Document } from "mongoose"
import {v4 as uuidv4} from "uuid"

export interface IProperties extends Document {
    _id: string
    name: string
    property_type: string
    description: string,
    order_number: number
}

let PropertiesSchema = new mongoose.Schema({
    _id: {
        type: String,
        default:uuidv4
    },
    name: {
        type: String,
        requried:true,
        unique:true
    },
    property_type: {
        type: String,
        enum:['radio','check','text'],
        default:'check'
    },
    description: {
        type: String,
        requried:true
    },
    order_number: {
        type: Number,
        required:true
    }
})

export default mongoose.model<IProperties>("property", PropertiesSchema)
