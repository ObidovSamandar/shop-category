import { Router } from "express"
import UserRouter from "./UsersRoute"
import CategoryRouter from "./CategoryRoute"
import PropertyRouter from "./PropertyRoute"
import ProductsRouter from "./ProductRoute"

import { isAdmin } from "../middlewares/CheckAdminMiddleware"

const router = Router({ mergeParams: true })
const checkAdmin = new isAdmin() 

router.use("/shop/user", UserRouter)
router.use(checkAdmin.areYouAdmin)
router.use("/shop/category", CategoryRouter)
router.use("/shop/product", PropertyRouter)
router.use("/shop/makeproduct", ProductsRouter)
export default router
