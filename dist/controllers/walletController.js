"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const walletRepository_1 = __importDefault(require("../respository/walletRepository"));
const userRepository_1 = __importDefault(require("../respository/userRepository"));
const WalletController = {
    createWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId, 10);
        const checkUser = yield userRepository_1.default.getUserById(userId);
        if (!checkUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        let walletName = checkUser.first_name;
        const wallet = yield walletRepository_1.default.CreateWallet(userId, walletName);
        if (wallet) {
            throw new Error(`You allready have a wallet`);
        }
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Wallet created successfully",
            wallet,
        });
    }),
    getWallet: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId, 10);
        const checkUser = yield userRepository_1.default.getUserById(userId);
        if (!checkUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        const wallet = yield walletRepository_1.default.getWalletByUserId(userId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(wallet);
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId, 10);
    }),
};
exports.default = WalletController;
