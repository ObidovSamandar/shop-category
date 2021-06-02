import { Router } from "express"
import { ProductsController } from "../controllers/ProductsController"
import { ProductsValidator } from "../validators/ProductsValidate"

const router = Router({ mergeParams: true })
const controller = new ProductsController()
const validator = new ProductsValidator()

router.route("/create").post(validator.create,controller.create)
router.route("/all").get(controller.getAll)
router.route('/delete/:id').delete(controller.delete)
router.route("/:id").get(controller.getById).put(validator.update,controller.update)
export default router
