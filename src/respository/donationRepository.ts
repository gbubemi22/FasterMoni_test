import { Op } from "sequelize";
import DB from "../DB/db";



const DonationRepository = {
     CreateDonation: async(userId: number, beneficiaryId:number, amount: number) => {
          const donation = await DB.donations.create({
              userId,
              beneficiaryId,
              amount ,
          })
          return donation
     },

     getDonationsByUserId: async(id:number) => {
         const donations = await DB.donations.findAll({
          where: { userId: id },
          attributes: { exclude: ['createdAt', 'updatedAt'] },
         })

       return donations;
     },
     getDonationByUserIdorBeneficiatyId: async(id:number) => {
       const result = await DB.donations.findAll({
          where: { [Op.or]: [{ userId: id}, { beneficiaryId: id}] },
          attributes: { exclude: ["createdAt", "updatedAt"] },
       })

       return result;
     },

     getDonationsBeneficiaryId: async(id:number) => {
          const donations = await DB.donations.findAll({
           where: { beneficiaryId: id },
           attributes: { exclude: ['createdAt', 'updatedAt'] },
          })
 
        return donations;
      },
}


export default DonationRepository;