import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import { comparePassword } from "../utils/bcrypt"
import catchAsync from "../utils/catchAsync"
import { generateToken } from "../utils/jwt"

export class UserController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const users = await storage.user.findAll(req.query)

        res.status(200).json({
            success: true,
            data: {
                users
            }
        })
    })

    getById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.findById(req.params.id)

        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    })

    getByEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.findByEmail(req.body.email)

        if(!user) return next(new AppError(404,'User not found!'))

        if(!comparePassword(req.body.password,user.password)) return next(new AppError(400,'Password is incorrect!'))

       let token = await generateToken({
           id:user._id
       })
        res.status(200).json({
            success: true,
            data: {
                token
            }
        })
    })
    
    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const user = await storage.user.create(req.body)

        res.status(201).json({
            success: true,
            data: {
                user
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const updateUser = await storage.user.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                updated:updateUser
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await storage.user.delete(req.params.id)

        res.status(204).json({
            success: true,
            data: null
        })
    })
}
