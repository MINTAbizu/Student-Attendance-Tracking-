import jwt from 'jsonwebtoken';
import UserModel from "../model/usermodel.js";

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const jwtverifid = jwt.verify(token, process.env.JWT_SECRET);
    if (!jwtverifid) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await UserModel.findById(jwtverifid.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    req.user = user; // Attach user to request object
    next();

  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

export default authmiddleware;