import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"


export class CategoryController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const categories = await storage.category.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                categories
            }
        })
    })

    getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const category = await storage.category.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: {
                category
            }
        })
    })
    
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        const categoryCreate = await storage.category.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                createdCategory:categoryCreate
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updateCategory = await storage.category.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updatedCategory:updateCategory
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.category.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
