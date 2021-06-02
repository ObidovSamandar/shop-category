import { ProductsRepo } from "../repo/products"
import Products, { IProducts } from "../../models/ProductsModel"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class ProductsStorage implements ProductsRepo {
    private scope = "storage.sample"

    async findAll(query: Object): Promise<IProducts[]> {
        try {
            let products = await Products.find({ ...query })

            return products
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }


    async findById(id: String): Promise<IProducts> {
        try {
            let singleProduct = await Products.findById(id)

            if (!singleProduct) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return singleProduct
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

   

    async create(payload: IProducts): Promise<IProducts> {
        try {
            let createProduct = await Products.create(payload)

            return createProduct
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IProducts): Promise<IProducts> {
        try {
            let updateProduct = await Products.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!updateProduct) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found")
            }

            return updateProduct
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error.message}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let deleteProduct = await Products.findByIdAndDelete(id)

            if (!deleteProduct) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found")
            }

            return deleteProduct
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }
}
