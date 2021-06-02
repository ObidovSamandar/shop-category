import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import { comparePassword } from "../utils/bcrypt"
import catchAsync from "../utils/catchAsync"
import { generateToken, verifyToken } from "../utils/jwt"

export class isAdmin {
    areYouAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let MyToken = req.headers.authorization || ""
        let userInfo = await verifyToken(MyToken)
        let checkRole = await storage.user.findById(userInfo.id)
        if(checkRole.role!='admin'){
            return next(new AppError(401,'You do not have permission for implementing this operation!'))
        }
        return next()
    })
}