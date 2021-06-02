import { IProperties } from "../../models/PropertiesModel"

export interface IPropertiesAllResponse {
    payloads: IProperties[]
    count: number
}

export interface PropertyRepo {
    create(payload: IProperties): Promise<IProperties>
    update(id: string, payload: IProperties): Promise<IProperties>
    delete(id: string): Promise<any>
    findAll(query: Object): Promise<IProperties[]>
    findById(id: string): Promise<IProperties>
}
