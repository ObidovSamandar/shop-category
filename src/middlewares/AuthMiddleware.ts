import { NextFunction, Request, Response} from "express"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import { verifyToken } from "../utils/jwt"

interface RequestLocal extends Request {
    user:object | string
}
export class havePermission {
    isUserHaveToken = catchAsync(async (req: RequestLocal, res: Response, next: NextFunction) => {
        let MyToken = req.headers.authorization || ""
        let token = await verifyToken(MyToken)
        if(!token){
            return next(new AppError(401,'You do not have permission for entering for this route'))
        }else{
            req.user = token
            next()
        }
    })
}