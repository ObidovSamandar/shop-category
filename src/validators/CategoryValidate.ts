import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"

export class CategoryValidator {
    keys = {
        required: "required",
        optional: "optional"
    }

    createSchema = Joi.object({
        title: Joi.string().required(),
    })

    updateSchema = Joi.object({
        title: Joi.string().required()
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
