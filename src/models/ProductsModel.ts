import mongoose, { Schema, Document } from "mongoose"
import {v4 as uuidv4} from "uuid"

export interface IProducts extends Document {
    _id: string
    title:string
    properties:string[]
    category: string[]
    price: number
    barcode: number
    measurement: number
}

let ProductsSchema = new mongoose.Schema({
    _id: {
        type: String,
        default:uuidv4
    },
    title: {
        type: String,
        requried:true,
        unique:true
    },
    properties: {
        type:Array,
        ref:'properties',
    },
    category: {
        type: Array,
        ref: 'categories',
    },
    price: {
        type: Number,
        required:true
    },
    barcode: {
        type: Number,
        required: true
    },
    measurement: {
        type: Number,
        required: true
    }
})

export default mongoose.model<IProducts>("product", ProductsSchema)
