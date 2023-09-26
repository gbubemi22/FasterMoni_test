"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
router
    .route('/register')
    .post(authController_1.default.createUser);
router
    .route('/login')
    .post(authController_1.default.login);
// Add the prefix to all routes
const prefix = '/api/v1/auth';
router.use(prefix, router);
exports.default = router;
