import { Op } from "sequelize";
import DB from "../DB/db";

const WallerRepository = {
  CreateWallet: async (userId: number, walletName: string) => {
    const wallet = await DB.wallets.create({
      userId,
      walletName
    });

    return wallet;
  },

  getWalletByUserId: async (userId: number) => {
    const wallet = await DB.wallets.findOne({
      where: { userId },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return wallet;
  },

  
};

export default WallerRepository;
