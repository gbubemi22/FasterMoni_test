import express from 'express';
const router = express.Router();
import AuthController from '../controllers/authController';



router
.route('/register')
.post(AuthController.createUser)


router
.route('/login')
.post(AuthController.login)



// Add the prefix to all routes
const prefix = '/api/v1/auth';
router.use(prefix, router);

export default router;


