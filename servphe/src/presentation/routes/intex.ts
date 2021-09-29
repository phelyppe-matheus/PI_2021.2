import Router from 'express';
import serviceRoutes from "./ServicesRouter"

const router = Router()

router.use('/servicos', serviceRoutes)

export default router