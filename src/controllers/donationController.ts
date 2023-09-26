import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import UserRepository from "../respository/userRepository";
import WallerRepository from "../respository/walletRepository";
import DonationRepository from "../respository/donationRepository";

const DonationController = {
  createDonation: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    const { beneficiaryId, amount } = req.body;
    const checkUser = await UserRepository.getUserById(userId);

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

    const beneficiaryUser = await UserRepository.getUserById(beneficiaryId);

    if (!beneficiaryUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "beneficiary User not found",
      });

    //  check if user as enough balance

    const checkBalance = await WallerRepository.getWalletByUserId(userId);

    if (checkBalance.balance < amount) {
      throw new Error(`You dont have enough balance`);
    }

    //deccute amount

    const deductedAmount = -amount;

    await WallerRepository.updatDonorWallet(userId, deductedAmount);

    await WallerRepository.updatBrneficiaryWallet(beneficiaryId, amount);

    const donation = await DonationRepository.CreateDonation(
      userId,
      beneficiaryId,
      amount
    );

    // Update donation counts for both donor and beneficiary
    await UserRepository.updateDonorCount(userId);
    await UserRepository.updateBeneficiaryCount(beneficiaryId);

    res.status(StatusCodes.OK).json({
      message: "Donation created successfully",
      donation,
    });
  },

  checkDonationsMade: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    const PAGE_SIZE = 10;
    const { page } = req.query;
    const currentPage = parseInt(page as string, 10) || 1;

    const checkUser = await UserRepository.getUserById(userId);

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

    const offset = (currentPage - 1) * PAGE_SIZE;

    const donations = await DonationRepository.getDonationsByUserId(userId);

    if (!donations) {
      throw new Error(`You have not made any donation`);
    }

    return res.status(StatusCodes.OK).json({ donations, offset });
  },
  checkDonationsReived: async (req: Request, res: Response) => {
    const beneficiaryId = parseInt(req.params.beneficiaryId, 10);

    const checkUser = await UserRepository.getUserById(beneficiaryId);

    const PAGE_SIZE = 10;
    const { page } = req.query;
    const currentPage = parseInt(page as string, 10) || 1;
    const offset = (currentPage - 1) * PAGE_SIZE;

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

    const donations = await DonationRepository.getDonationsByUserId(
      beneficiaryId
    );

    if (!donations) {
      throw new Error(`You have not made any donation`);
    }

    return res.status(StatusCodes.OK).json({ donations, offset });
  },

  getOneDonationForBeneficiary: async (req: Request, res: Response) => {
    const beneficiaryId = parseInt(req.params.beneficiaryId, 10);
    const donationId = parseInt(req.params.beneficiaryId, 10);

    const checkUser = await UserRepository.getUserById(beneficiaryId);

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

    const checkDonation = await DonationRepository.getDonationsById(donationId);

    if (!checkDonation)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Donation not found",
      });

    const donation = await DonationRepository.getDonationByIdAndBeneficaty(
      donationId,
      beneficiaryId
    );

    return res.status(StatusCodes.OK).json(donation);
  },

  viewDonationsByPeriod: async (req: Request, res: Response) => {
    //     const { startDate, endDate } = req.query;

    const startDateStr = req.query.startDate as string | undefined;
    const endDateStr = req.query.endDate as string | undefined;

    if (!startDateStr || !endDateStr) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "startDate and endDate are required query parameters.",
      });
    }
    const PAGE_SIZE = 10;
    const { page } = req.query;
    const currentPage = parseInt(page as string, 10) || 1;
    const offset = (currentPage - 1) * PAGE_SIZE;

    const parsedStartDate = new Date(startDateStr);
    const parsedEndDate = new Date(endDateStr);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid date format for startDate or endDate.",
      });
    }

    const donations = await DonationRepository.getDonationsByPeriod(
      parsedStartDate,
      parsedEndDate
    );

    // Return the list of donations
    res.status(StatusCodes.OK).json({
      message: "Donations within the specified period",
      donations,
      offset,
    });
  },
};

export default DonationController;
