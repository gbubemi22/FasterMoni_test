import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  ///to add saltrounds
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};



export const comparePassword = async (password: string, user: any) => {
  try {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // You can handle the error as needed
  }
};
