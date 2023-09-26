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
const userRepository_1 = __importDefault(require("../respository/userRepository"));
const http_status_codes_1 = require("http-status-codes");
const passwordValidator_1 = __importDefault(require("../utils/passwordValidator"));
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../validations/validation"));
const walletRepository_1 = __importDefault(require("../respository/walletRepository"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const AuthController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validation_1.default.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: "Invalid request body",
                error: error.details[0].message,
            });
        }
        const { first_name, last_name, email, number, password } = req.body;
        const checkUser = yield userRepository_1.default.getUserByEmailNumber(email, number);
        if (checkUser) {
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json(`user with email ${email}  or phone ${number} already exists`);
        }
        const passwordValidationResult = (0, passwordValidator_1.default)(password);
        if (typeof passwordValidationResult !== "boolean") {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(passwordValidationResult);
        }
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        // Create the user
        const createdUser = yield userRepository_1.default.CreateUser(first_name, last_name, email, number, hashedPassword);
        // Omit the password from the user object
        const userWithoutPassword = Object.assign(Object.assign({}, createdUser.toJSON()), { password: undefined });
        const userId = createdUser.id;
        const walletName = createdUser.first_name;
        yield walletRepository_1.default.CreateWallet(userId, walletName);
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            message: "Account created successfully",
            user: userWithoutPassword,
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userRepository_1.default.getUserByEmail(email);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = yield (0, password_1.comparePassword)(password, user);
        if (!isPasswordValid) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: "Invalid email or password",
            });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            user,
            token: token,
        });
    }),
};
const checkDonationMilestones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query users who reached the milestone (e.g., reached 2 donations)
        const milestone = 2; // Define your milestone
        const usersToThank = yield userRepository_1.default.getUsersWithDonationMilestone(milestone);
        if (usersToThank.length === 0) {
            console.log("No users reached the milestone.");
            return;
        }
        const message = "Thank you for reaching this milestone!";
        // Send thank you messages to users
        for (const user of usersToThank) {
            yield (0, sendEmail_1.default)(user.email, "Thank You", message);
            console.log(`Thank you email sent to ${user.email}`);
        }
    }
    catch (error) {
        console.error("Error checking donation milestones:", error);
    }
});
// Run the checkDonationMilestones function once a day (24 hours)
setInterval(checkDonationMilestones, 24 * 60 * 60 * 1000);
checkDonationMilestones();
exports.default = AuthController;
