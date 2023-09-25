import { Op } from "sequelize";
import DB from "../DB/db";



const PinRepository = {
   createPin:async (userId: number, pin: number) => {
     const newpin = await DB.pins.create({
          userId,
          pin
     })
     return newpin;
   },

   getOneUserSPin: async(userId: number) => {
     const pin = await DB.pins.findOne({
          where: { userId },
          attributes: { exclude: ["createdAt", "updatedAt"] },
     })
     return pin;
   }
}


export default PinRepository;


