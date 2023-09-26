import express from "express";
const router = express.Router();

import DonationController from "../controllers/donationController";

router.route("/:userId").post(DonationController.createDonation);

router.route("/made/:userId").get(DonationController.checkDonationsMade);

router.route("/recived/:beneficiaryId").get(DonationController.checkDonationsReived);

router
  .route("/:donationId/beneficiaryId")
  .post(DonationController.getOneDonationForBeneficiary);

router.route("/search").get(DonationController.viewDonationsByPeriod);

// Add the prefix to all routes
const prefix = "/api/v1/donations";
router.use(prefix, router);

export default router;
