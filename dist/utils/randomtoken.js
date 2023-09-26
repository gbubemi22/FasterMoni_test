"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = exports.generateInvitationToken = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const generateInvitationToken = () => {
    const OTP = otp_generator_1.default.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    return OTP;
};
exports.generateInvitationToken = generateInvitationToken;
function generateRandomString() {
    // Generate three random digits for each part of the format
    const part1 = Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString();
    const part2 = Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString();
    const part3 = Math.floor(Math.random() * 10).toString() +
        Math.floor(Math.random() * 10).toString();
    // Combine the parts with dashes
    const result = `${part1}-${part2}-${part3}`;
    return result;
}
exports.generateRandomString = generateRandomString;
