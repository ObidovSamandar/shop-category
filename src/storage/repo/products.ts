import { IProducts } from "../../models/ProductsModel"

export interface IProductsAllResponse {
    payloads: IProducts[]
    count: number
}

export interface ProductsRepo {
    create(payload: IProducts): Promise<IProducts>
    update(id: string, payload: IProducts): Promise<IProducts>
    delete(id: string): Promise<any>
    findAll(query: Object): Promise<IProducts[]>
    findById(id: string): Promise<IProducts>
}
