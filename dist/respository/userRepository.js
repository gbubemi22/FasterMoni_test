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
const UserRepository = {
    CreateUser: (first_name, last_name, email, number, password) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.users.create({
            first_name,
            last_name,
            email,
            number,
            password,
        });
        return user;
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.users.findByPk(id);
        return user;
    }),
    getUserByEmailNumber: (email, number) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.users.findOne({
            where: { [sequelize_1.Op.or]: [{ email }, { number }] },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return user;
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.users.findOne({
            where: { email },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return user;
    }),
    getUserBynumber: (number) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.default.users.findOne({ where: { number } });
        return user;
    }),
    updateDonorCount: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        // Find the donor user by their ID
        const user = yield db_1.default.users.findByPk(userId);
        if (user) {
            // Increment the donation count
            user.donationCount += 1;
            // Save the updated user record
            yield user.save();
        }
        return user;
    }),
    updateBeneficiaryCount: (beneficiaryId) => __awaiter(void 0, void 0, void 0, function* () {
        // Find the beneficiary user by their ID
        const user = yield db_1.default.users.findByPk(beneficiaryId);
        if (user) {
            // Increment the donation count
            user.donationCount += 1;
            // Save the updated user record
            yield user.save();
        }
        return user;
    }),
    getUsersWithDonationMilestone: (milestone) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield db_1.default.users.findAll();
        const usersWithMilestone = users.filter((user) => {
            const donationCount = user.donationCount;
            return donationCount >= milestone;
        });
        return usersWithMilestone;
        //   const usersWithMilestone = users.filter((user: any) => {
        //     const donationCount = user.donations.length;
        //     return donationCount >= milestone;
        //   });
        //   return usersWithMilestone;
        // },
    }),
};
exports.default = UserRepository;
