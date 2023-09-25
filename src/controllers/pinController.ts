import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import UserRepository from "../respository/userRepository";
import PinRepository from "../respository/pinRepository";


const PinController = {
    createPin: async (req: Request, res: Response) => {
     const userId = parseInt(req.params.userId, 10);

     const checkUser = await UserRepository.getUserById(userId); 

     const { pin } = req.body;

   
    if (!checkUser)
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });

    //TODO: hash the pin

      const newPin = await PinRepository.createPin(userId,pin)

      

         return res.status(StatusCodes.CREATED).json({
          message: "Pin created successfully",
          newPin,
        });
    },

    //TODO: compare the pin 

    
}


export default PinController;