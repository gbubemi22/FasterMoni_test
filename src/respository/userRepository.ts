import { Op } from "sequelize";
import DB from "../DB/db";

const UserRepository = {
  CreateUser: async (
    first_name: string,
    last_name: string,
    email: string,
    number: string,
    password: string
  ) => {
    const user = await DB.users.create({
      first_name,
      last_name,
      email,
      number,
      password,
    });

    return user;
  },
  getUserById: async (id: number) => {
    const user = await DB.users.findByPk(id);

    return user;
  },

  getUserByEmailNumber: async (email: string, number: string) => {
    const user: any = await DB.users.findOne({
      where: { [Op.or]: [{ email }, { number }] },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await DB.users.findOne({
      where: { email },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    return user;
  },

  getUserBynumber: async (number: string) => {
    const user = await DB.users.findOne({ where: { number } });

    return user;
  },

  updateDonorCount: async (userId: number) => {
    // Find the donor user by their ID
    const user = await DB.users.findByPk(userId);

    if (user) {
      // Increment the donation count
      user.donationCount += 1;

      // Save the updated user record
      await user.save();
    }

    return user;
  },

  updateBeneficiaryCount: async (beneficiaryId: number) => {
    // Find the beneficiary user by their ID
    const user = await DB.users.findByPk(beneficiaryId);

    if (user) {
      // Increment the donation count
      user.donationCount += 1;

      // Save the updated user record
      await user.save();
    }

    return user;
  },

  getUsersWithDonationMilestone: async (milestone: any) => {
    


    const users = await DB.users.findAll();

    const usersWithMilestone = users.filter((user: any) => {
      const donationCount = user.donationCount; 
      return donationCount >= milestone;
    });
    return usersWithMilestone;

  //   const usersWithMilestone = users.filter((user: any) => {
  //     const donationCount = user.donations.length;
  //     return donationCount >= milestone;
  //   });

  //   return usersWithMilestone;
  // },
  },
};

export default UserRepository;
