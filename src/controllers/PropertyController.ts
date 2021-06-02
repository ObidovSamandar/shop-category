import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

export class PropertyControl {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const properties = await storage.property.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                properties
            }
        })
    })

    getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const property = await storage.property.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: {
                property
            }
        })
    })

    
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const createdProperty = await storage.property.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                createdProperty
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updatedProperty = await storage.property.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updated:updatedProperty
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.property.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
