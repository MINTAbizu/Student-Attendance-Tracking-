import bcrypt from "bcrypt";
import UserModel from "./model/usermodel.js";

const userregistration = async () => {
  try {
    // Check if admin user already exists
    const existingUser = await UserModel.findOne({ email: "test@gmail.com" });
    if (existingUser) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedpassword = await bcrypt.hash("123", 10);

    const user = new UserModel({
      name: "test",
      email: "test@gmail.com",
      password: hashedpassword,
      role: "admin",
      age: 25,
    });
    await user.save();
    console.log("User registered successfully:", user);
  } catch (error) {
    console.error("Error during user registration:", error);
  }
};

export default userregistration;