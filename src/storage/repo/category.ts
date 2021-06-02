import { ICategory } from "../../models/CategoryModel"

export interface ICategoryAllResponse {
    payloads: ICategory[]
    count: number
}

export interface CategoryRepo {
    create(payload: ICategory): Promise<ICategory>
    update(id: string, payload: ICategory): Promise<ICategory>
    delete(id: string): Promise<any>
    findAll(query: Object): Promise<ICategory[]>
    findById(id: string): Promise<ICategory>
}
