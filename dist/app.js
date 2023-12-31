"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const rateLimitPromise = Promise.resolve().then(() => __importStar(require("express-rate-limit")));
const xss_clean_1 = __importDefault(require("xss-clean"));
// import routes
const AuthRouter_1 = __importDefault(require("./routers/AuthRouter"));
const WalletRouter_1 = __importDefault(require("./routers/WalletRouter"));
const PinRouter_1 = __importDefault(require("./routers/PinRouter"));
const DonationRouter_1 = __importDefault(require("./routers/DonationRouter"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.JWT_COOKIE));
app.use(body_parser_1.default.urlencoded({ extended: true }));
const applyRateLimiter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { default: rateLimit } = yield rateLimitPromise;
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
    limiter(req, res, next);
});
app.use((0, xss_clean_1.default)());
app.use(applyRateLimiter);
app.use((0, helmet_1.default)());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Fast-Moni App" });
});
//USE ROUTES
app.use(AuthRouter_1.default, WalletRouter_1.default, PinRouter_1.default, DonationRouter_1.default);
//ErrorHandlerMiddleware
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
app.use(not_found_1.default);
app.use(error_handler_1.default);
//port
const port = process.env.PORT || 5001;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => {
            console.log(`Listing on port ${port}...`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
