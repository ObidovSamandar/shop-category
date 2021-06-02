import { IUser } from "../../models/UserModel"

export interface IUserAllResponse {
    payloads: IUser[]
    count: number
}

export interface UserRepo {
    create(payload: IUser): Promise<IUser>
    update(id: string, payload: IUser): Promise<IUser>
    delete(id: string): Promise<any>
    findAll(query: Object): Promise<IUser[]>
    findById(id: string): Promise<IUser>
    findByEmail(email: string): Promise<IUser>
}
