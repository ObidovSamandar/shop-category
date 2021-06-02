import { UserStorage } from "./mongo/user"
import { CategoryStorage } from "./mongo/category"
import { PropertyStorage } from "./mongo/properties"
import { ProductsStorage } from "./mongo/products"
interface IStorage {
    user: UserStorage
    category: CategoryStorage
    property: PropertyStorage
    product: ProductsStorage
}

export let storage: IStorage = {
    user: new UserStorage(),
    category : new CategoryStorage(),
    property: new PropertyStorage(),
    product: new ProductsStorage()
}
