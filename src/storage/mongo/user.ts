import { UserRepo, IUserAllResponse } from "../repo/user"
import User, { IUser } from "../../models/UserModel"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"
import { generateHashPassword } from "../../utils/bcrypt"

export class UserStorage implements UserRepo {
    private scope = "storage.sample"

    async findAll(query: Object): Promise<IUser[]> {
        try {
            let users = await User.find({ ...query })

            return users
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }


    async findById(id: String): Promise<IUser> {
        try {
            let user = await User.findById(id)

            if (!user) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return user
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async findByEmail(email: string): Promise<IUser> {
        try {
            let userByEmail = await User.findOne({ email })

            if (!userByEmail) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return userByEmail
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

    async create(payload: IUser): Promise<IUser> {
        try {
            let createUser = await User.create({
                name: payload.name,
                email: payload.email,
                password: generateHashPassword(payload.password)
            })

            return createUser
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IUser): Promise<IUser> {
        try {
            let dbObj = await User.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!dbObj) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error.message}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let deleteUser = await User.findByIdAndDelete(id)

            if (!deleteUser) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found")
            }

            return deleteUser
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }
}
