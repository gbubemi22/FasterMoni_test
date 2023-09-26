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
const userRepository_1 = __importDefault(require("../respository/userRepository"));
const walletRepository_1 = __importDefault(require("../respository/walletRepository"));
const donationRepository_1 = __importDefault(require("../respository/donationRepository"));
const DonationController = {
    createDonation: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = parseInt(req.params.userId, 10);
            const { beneficiaryId, amount } = req.body;
            const checkUser = yield userRepository_1.default.getUserById(userId);
            if (!checkUser) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "User not found",
                });
            }
            const beneficiaryUser = yield userRepository_1.default.getUserById(beneficiaryId);
            if (!beneficiaryUser) {
                return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                    message: "Beneficiary User not found",
                });
            }
            // Check if user has enough balance
            const checkBalance = yield walletRepository_1.default.getWalletByUserId(userId);
            if (checkBalance.balance < amount) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    message: "Insufficient balance",
                });
            }
            // Deduct amount
            const deductedAmount = checkBalance.balance -= amount;
            yield checkBalance.save();
            yield walletRepository_1.default.updatBrneficiaryWallet(beneficiaryId, amount);
            const donation = yield donationRepository_1.default.CreateDonation(userId, beneficiaryId, amount);
            // Update donation counts for both donor and beneficiary
            yield userRepository_1.default.updateDonorCount(userId);
            yield userRepository_1.default.updateBeneficiaryCount(beneficiaryId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "Donation created successfully",
                donation,
            });
        }
        catch (error) {
            console.error("Error in createDonation:", error);
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "An error occurred while processing the donation.",
                error: error,
            });
        }
    }),
    checkDonationsMade: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.userId, 10);
        const PAGE_SIZE = 10;
        const { page } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const checkUser = yield userRepository_1.default.getUserById(userId);
        if (!checkUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        const offset = (currentPage - 1) * PAGE_SIZE;
        const donations = yield donationRepository_1.default.getDonationsByUserId(userId);
        if (!donations) {
            throw new Error(`You have not made any donation`);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ donations, offset });
    }),
    checkDonationsReived: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const beneficiaryId = parseInt(req.params.beneficiaryId, 10);
        const checkUser = yield userRepository_1.default.getUserById(beneficiaryId);
        const PAGE_SIZE = 10;
        const { page } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const offset = (currentPage - 1) * PAGE_SIZE;
        if (!checkUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        const donations = yield donationRepository_1.default.getDonationsByUserId(beneficiaryId);
        if (!donations) {
            throw new Error(`You have not made any donation`);
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ donations, offset });
    }),
    getOneDonationForBeneficiary: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const beneficiaryId = parseInt(req.params.beneficiaryId, 10);
        const donationId = parseInt(req.params.beneficiaryId, 10);
        const checkUser = yield userRepository_1.default.getUserById(beneficiaryId);
        if (!checkUser)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        const checkDonation = yield donationRepository_1.default.getDonationsById(donationId);
        if (!checkDonation)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: "Donation not found",
            });
        const donation = yield donationRepository_1.default.getDonationByIdAndBeneficaty(donationId, beneficiaryId);
        return res.status(http_status_codes_1.StatusCodes.OK).json(donation);
    }),
    viewDonationsByPeriod: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //     const { startDate, endDate } = req.query;
        const startDateStr = req.query.startDate;
        const endDateStr = req.query.endDate;
        if (!startDateStr || !endDateStr) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "startDate and endDate are required query parameters.",
            });
        }
        const PAGE_SIZE = 10;
        const { page } = req.query;
        const currentPage = parseInt(page, 10) || 1;
        const offset = (currentPage - 1) * PAGE_SIZE;
        const parsedStartDate = new Date(startDateStr);
        const parsedEndDate = new Date(endDateStr);
        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Invalid date format for startDate or endDate.",
            });
        }
        const donations = yield donationRepository_1.default.getDonationsByPeriod(parsedStartDate, parsedEndDate);
        // Return the list of donations
        res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Donations within the specified period",
            donations,
            offset,
        });
    }),
};
exports.default = DonationController;
