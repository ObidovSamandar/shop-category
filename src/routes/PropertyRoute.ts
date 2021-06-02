import { Router } from "express"
import { PropertyControl } from "../controllers/PropertyController"
import { PropertyValidator } from "../validators/PropertyValidate"

const router = Router({ mergeParams: true })
const controller = new PropertyControl()
const validator = new PropertyValidator()


router.route("/property/create").post(validator.create, controller.create)
router.route("/property/all").get(controller.getAll)
router.route("/property/:id").get(controller.getById).put(controller.update)
router.route("/property/delete/:id").delete(controller.delete)

export default router
