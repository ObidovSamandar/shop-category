import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class ProductsValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        title: Joi.string().required(),
        properties: Joi.array().required(),
        category: Joi.array().required(),
        price: Joi.number().required(),
        barcode: Joi.number().required(),
        measurement: Joi.number().required()
    })

    updateSchema = Joi.object({
        title: Joi.string(),
        properties: Joi.array(),
        category: Joi.array(),
        price: Joi.number(),
        barcode: Joi.number(),
        measurement: Joi.number()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        console.log(error)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
