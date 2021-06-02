import { CategoryRepo, ICategoryAllResponse } from "../repo/category"
import Category, { ICategory } from "../../models/CategoryModel"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class CategoryStorage implements CategoryRepo {
    private scope = "storage.sample"

    async findAll(query: Object): Promise<ICategory[]> {
        try {
            let categories = await Category.find({ ...query })

            return categories
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }


    async findById(id: String): Promise<ICategory> {
        try {
            let singleCategory = await Category.findById(id)

            if (!singleCategory) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return singleCategory
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

   

    async create(payload: ICategory): Promise<ICategory> {
        try {
            let createCategory = await Category.create(payload)

            return createCategory
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: ICategory): Promise<ICategory> {
        try {
            let updateCategory = await Category.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!updateCategory) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found")
            }

            return updateCategory
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error.message}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let deleteCategory = await Category.findByIdAndDelete(id)

            if (!deleteCategory) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found")
            }

            return deleteCategory
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }
}
