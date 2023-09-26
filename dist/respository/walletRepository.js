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
const db_1 = __importDefault(require("../DB/db"));
const WallerRepository = {
    CreateWallet: (userId, walletName) => __awaiter(void 0, void 0, void 0, function* () {
        const wallet = yield db_1.default.wallets.create({
            userId,
            walletName
        });
        return wallet;
    }),
    getWalletByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const wallet = yield db_1.default.wallets.findOne({
            where: { userId },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return wallet;
    }),
    updatDonorWallet: (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const walletUpdate = yield db_1.default.wallets.findOne({
            where: { userId },
        });
        walletUpdate.balance -= amount;
        // Save the updated wallet to the database
        yield walletUpdate.save();
        return walletUpdate;
    }),
    updatBrneficiaryWallet: (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const walletUpdate = yield db_1.default.wallets.findOne({
            where: { userId },
        });
        walletUpdate.balance += amount;
        // Save the updated wallet to the database
        yield walletUpdate.save();
        return walletUpdate;
    }),
};
exports.default = WallerRepository;
