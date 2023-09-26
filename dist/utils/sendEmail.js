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
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter using async/await
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        // Verify the transporter
        yield transporter.verify();
        return transporter;
    }
    catch (error) {
        console.error("Error creating email transporter:", error);
        throw error;
    }
});
// Function to send an email
const sendEmail = (email, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = yield createTransporter();
        const info = yield transporter.sendMail({
            from: `"FASTMONI" ${process.env.USER}`,
            to: email,
            subject: subject,
            text: text,
        });
        console.log("Email sent successfully:", info.response);
    }
    catch (error) {
        console.error("Email not sent:", error);
    }
});
exports.default = sendEmail;
