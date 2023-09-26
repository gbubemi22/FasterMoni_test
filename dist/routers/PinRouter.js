"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pinController_1 = __importDefault(require("../controllers/pinController"));
const router = express_1.default.Router();
router
    .route('/:userId')
    .post(pinController_1.default.createPin);
// Add the prefix to all routes
const prefix = '/api/v1/pins';
router.use(prefix, router);
exports.default = router;
