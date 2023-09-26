import UserRepository from "../respository/userRepository";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import validatePasswordString from "../utils/passwordValidator";
import { comparePassword, hashPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import userSchema from "../validations/validation";
import WallerRepository from "../respository/walletRepository";
import sendEmail from "../utils/sendEmail";

const AuthController = {
  createUser: async (req: Request, res: Response): Promise<Response> => {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Invalid request body",
        error: error.details[0].message,
      });
    }

    const { first_name, last_name, email, number, password } = req.body;

    const checkUser = await UserRepository.getUserByEmailNumber(email, number);

    if (checkUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json(`user with email ${email}  or phone ${number} already exists`);
    }

    const passwordValidationResult = validatePasswordString(password);
    if (typeof passwordValidationResult !== "boolean") {
      return res.status(StatusCodes.BAD_REQUEST).json(passwordValidationResult);
    }

    const hashedPassword = await hashPassword(password);

    // Create the user
    const createdUser = await UserRepository.CreateUser(
      first_name,
      last_name,
      email,
      number,
      hashedPassword
    );

    // Omit the password from the user object
    const userWithoutPassword = {
      ...createdUser.toJSON(),
      password: undefined,
    };

    const userId = createdUser.id;
    const walletName = createdUser.first_name;

    await WallerRepository.CreateWallet(userId, walletName);

    return res.status(StatusCodes.CREATED).json({
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await comparePassword(password, user);

    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    return res.status(StatusCodes.OK).json({
      user,
      token: token,
    });
  },
};

const checkDonationMilestones = async () => {
  try {
    // Query users who reached the milestone (e.g., reached 2 donations)
    const milestone = 2; // Define your milestone
    const usersToThank = await UserRepository.getUsersWithDonationMilestone(
      milestone
    );

    if (usersToThank.length === 0) {
      console.log("No users reached the milestone.");
      return;
    }

    const message = "Thank you for reaching this milestone!";

    // Send thank you messages to users
    for (const user of usersToThank) {
      await sendEmail(user.email, "Thank You", message);
      console.log(`Thank you email sent to ${user.email}`);
    }
  } catch (error) {
    console.error("Error checking donation milestones:", error);
  }
};

// Run the checkDonationMilestones function once a day (24 hours)
setInterval(checkDonationMilestones, 24 * 60 * 60 * 1000);

checkDonationMilestones();

export default AuthController;
