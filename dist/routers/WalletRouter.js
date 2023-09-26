"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const walletController_1 = __importDefault(require("../controllers/walletController"));
router
    .route('/')
    .post(walletController_1.default.createWallet);
router
    .route('/:userId')
    .get(walletController_1.default.getWallet);
// Add the prefix to all routes
const prefix = '/api/v1/wallets';
router.use(prefix, router);
exports.default = router;
