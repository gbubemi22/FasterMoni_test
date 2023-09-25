import express from 'express';
import PinController from '../controllers/pinController';
const router = express.Router();



router
.route('/:userId')
.post(PinController.createPin)


// Add the prefix to all routes
const prefix = '/api/v1/pins';
router.use(prefix, router);

export default router;