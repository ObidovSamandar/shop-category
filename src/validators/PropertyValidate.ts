import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class PropertyValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        name: Joi.string().required(),
        property_type:Joi.string().required(),
        description:Joi.string().required(),
        order_number: Joi.number().required()
    })

    updateSchema = Joi.object({
        name: Joi.string(),
        property_type:Joi.string(),
        description:Joi.string(),
        order_number: Joi.number()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.createSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
