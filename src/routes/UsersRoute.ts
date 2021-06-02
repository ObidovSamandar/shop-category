import { Router } from "express"
import { UserController } from "../controllers/UserController"
import { UserValidator } from "../validators/UserRegisterLoginValidate"

const router = Router({ mergeParams: true })
const controller = new UserController()
const validator = new UserValidator()

router.route("/register").post(validator.create, controller.create)
router.route("/login").post(validator.update, controller.getByEmail)

export default router
