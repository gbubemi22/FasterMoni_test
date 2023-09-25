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

    await WallerRepository.updatBrneficiaryWallet(
      beneficiaryId,
      amount
    );

    const donation = await DonationRepository.CreateDonation(
      userId,
      beneficiaryId,
      amount
    );

    res.status(StatusCodes.OK).json({
      message: "Donation created successfully",
      donation
    });
  },
};

export default DonationController;
