import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import WallerRepository from "../respository/walletRepository";
import UserRepository from "../respository/userRepository";

const WalletController = {
  createWallet: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    const checkUser = await UserRepository.getUserById(userId);

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

      let walletName = checkUser.first_name

    const wallet = await WallerRepository.CreateWallet(userId, walletName);

    if(wallet) {
     throw new Error(`You allready have a wallet`)
    }

    return res.status(StatusCodes.CREATED).json({
      message: "Wallet created successfully",
      wallet,
    });
  },

  getWallet: async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);

    const checkUser = await UserRepository.getUserById(userId);

    if (!checkUser)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "User not found",
      });

    const wallet = await WallerRepository.getWalletByUserId(userId);

    return res.status(StatusCodes.OK).json(wallet);
  },
};

export default WalletController;
