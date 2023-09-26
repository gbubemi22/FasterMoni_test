import { Op } from "sequelize";
import DB from "../DB/db";

const DonationRepository = {
  CreateDonation: async (
    userId: number,
    beneficiaryId: number,
    amount: number
  ) => {
    const donation = await DB.donations.create({
      userId,
      beneficiaryId,
      amount,
    });
    return donation;
  },

  getDonationsByUserId: async (id: number) => {
    const donations = await DB.donations.findAll({
      where: { userId: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return donations;
  },

  getDonationsById: async (id: number) => {
    const donation = await DB.donations.findByPk({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return donation;
  },

  getDonationByIdAndBeneficaty: async (id: number, beneficiaryId: number) => {
    const donation = await DB.donations.findOne({
      where: {
        id: id,
        beneficiaryId: beneficiaryId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return donation;
  },
  sentAndRecivedDonation: async (id: number) => {
    const result = await DB.donations.findAll({
      where: { [Op.or]: [{ userId: id }, { beneficiaryId: id }] },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return result;
  },

  getDonationsBeneficiaryId: async (id: number) => {
    const donations = await DB.donations.findAll({
      where: { beneficiaryId: id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return donations;
  },

  getDonationsByPeriod: async (startDate: Date, endDate: Date) => {
    const donations = await DB.donations.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return donations;
  },
};

export default DonationRepository;
