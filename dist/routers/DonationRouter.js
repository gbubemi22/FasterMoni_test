"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const donationController_1 = __importDefault(require("../controllers/donationController"));
router
    .route('/:userId')
    .post(donationController_1.default.createDonation);
router
    .route('/made/:userId')
    .get(donationController_1.default.checkDonationsMade);
router
    .route('/:beneficiaryId')
    .get(donationController_1.default.checkDonationsReived);
router
    .route('/:donationId/beneficiaryId')
    .post(donationController_1.default.getOneDonationForBeneficiary);
router
    .route('/search')
    .get(donationController_1.default.viewDonationsByPeriod);
// Add the prefix to all routes
const prefix = '/api/v1/donations';
router.use(prefix, router);
exports.default = router;
