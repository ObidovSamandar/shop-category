import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"


export class ProductsController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const products = await storage.product.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                products
            }
        })
    })

    getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const product = await storage.product.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: {
                product
            }
        })
    })
    
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const productCreate = await storage.product.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                createdProduct:productCreate
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updateProduct = await storage.product.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updatedProduct:updateProduct
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.product.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
