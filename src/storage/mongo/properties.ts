import { PropertyRepo } from "../repo/properties"
import Properties, { IProperties } from "../../models/PropertiesModel"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class PropertyStorage implements PropertyRepo {
    private scope = "storage.sample"

    async findAll(query: Object): Promise<IProperties[]> {
        try {
            let properties = await Properties.find({ ...query })

            return properties
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error.message}`)
            throw error
        }
    }


    async findById(id: String): Promise<IProperties> {
        try {
            let singleProperty = await Properties.findById(id)

            if (!singleProperty) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return singleProperty
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error.message}`)
            throw error
        }
    }

   

    async create(payload: IProperties): Promise<IProperties> {
        try {
            let createProperty = await Properties.create(payload)

            return createProperty
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(id: string, payload: IProperties): Promise<IProperties> {
        try {
            let updateProperty = await Properties.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!updateProperty) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, "Db object is not found")
            }

            return updateProperty
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error.message}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let deleteProperty = await Properties.findByIdAndDelete(id)

            if (!deleteProperty) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, "Db object is not found")
            }

            return deleteProperty
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error.message}`)
            throw error
        }
    }
}
