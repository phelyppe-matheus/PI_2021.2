import {Router} from "express"
import { ServicesController } from "../controllers/ServicesController"

const router = Router()
const servicosController = new ServicesController()

router.get('', servicosController.getAll)

router.post('', servicosController.create)

router.get('/:id', servicosController.getById)

router.put('/:id', servicosController.update)

router.delete('/:id', servicosController.delete)

export default router