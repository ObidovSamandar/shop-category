import jwt from "jsonwebtoken"
import config from "../config/config"
import { IUser } from "../models/UserModel"


export async function generateToken(data: object): Promise<string| object>{
    return jwt.sign(data,config.JwtSecretWord)
}

export async function verifyToken(token: string): Promise<any| object>{
    return jwt.verify(token,config.JwtSecretWord)
}