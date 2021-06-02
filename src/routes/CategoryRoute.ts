import { Router } from "express"
import { CategoryController } from "../controllers/CategoryController"
import { CategoryValidator } from "../validators/CategoryValidate"

const router = Router({ mergeParams: true })
const controller = new CategoryController()
const validator = new CategoryValidator()

router.route("/create").post(validator.create,controller.create)
router.route("/all").get(controller.getAll)
router.route('/delete/:id').delete(controller.delete)
router.route("/:id").get(controller.getById).put(validator.update,controller.update)
export default router
