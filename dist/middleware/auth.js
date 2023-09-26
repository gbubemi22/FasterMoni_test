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
exports.verifyTokenAndSuperAdminCheck = exports.softVerifyToken = exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
            if (err) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
    }
});
exports.verifyToken = verifyToken;
//
const softVerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
            req.user = decoded;
            next();
        });
    }
    else {
        next();
    }
});
exports.softVerifyToken = softVerifyToken;
const verifyTokenAndSuperAdminCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
            if (err) {
                return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            else {
                // Check user type and role_type in the decoded token
                if (decoded && decoded.type === 'SUPER_ADMIN') {
                    req.user = decoded;
                    next();
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user type or ' });
                }
            }
        });
    }
    else {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
    }
});
exports.verifyTokenAndSuperAdminCheck = verifyTokenAndSuperAdminCheck;
//export {softVerifyToken}
exports.default = exports.verifyToken;
