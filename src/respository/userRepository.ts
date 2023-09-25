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
      password
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
			attributes: { exclude: ['createdAt', 'updatedAt'] },
			 
		});

    return user;
  },

  getUserBynumber: async (number: string) => {
    const user = await DB.users.findOne({ where: { number } });

    return user;
  },
};

export default UserRepository;
