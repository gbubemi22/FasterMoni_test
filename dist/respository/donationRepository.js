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
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../DB/db"));
const DonationRepository = {
    CreateDonation: (userId, beneficiaryId, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const donation = yield db_1.default.donations.create({
            userId,
            beneficiaryId,
            amount,
        });
        return donation;
    }),
    getDonationsByUserId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const donations = yield db_1.default.donations.findAll({
            where: { userId: id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return donations;
    }),
    getDonationsById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const donation = yield db_1.default.donations.findByPk({
            where: { id: id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return donation;
    }),
    getDonationByIdAndBeneficaty: (id, beneficiaryId) => __awaiter(void 0, void 0, void 0, function* () {
        const donation = yield db_1.default.donations.findOne({
            where: {
                id: id,
                beneficiaryId: beneficiaryId,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        return donation;
    }),
    sentAndRecivedDonation: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.default.donations.findAll({
            where: { [sequelize_1.Op.or]: [{ userId: id }, { beneficiaryId: id }] },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return result;
    }),
    getDonationsBeneficiaryId: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const donations = yield db_1.default.donations.findAll({
            where: { beneficiaryId: id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return donations;
    }),
    getDonationsByPeriod: (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
        const donations = yield db_1.default.donations.findAll({
            where: {
                createdAt: {
                    [sequelize_1.Op.between]: [startDate, endDate],
                },
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });
        return donations;
    }),
};
exports.default = DonationRepository;
