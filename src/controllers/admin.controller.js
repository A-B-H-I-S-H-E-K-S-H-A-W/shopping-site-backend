import { Admin } from "../models/admin.models.js";
import Decrypt from "../utils/Decrypt.js";
import Encrypt from "../utils/Encrypt.js";

export async function register(req, res) {
  try {
    const admins = [
      {
        username: process.env.AUTH_ADMIN_USERNAME,
        email: process.env.AUTH_ADMIN_EMAIL,
        password: process.env.AUTH_ADMIN_PASSWORD,
        phone: process.env.AUTH_ADMIN_PHONE,
      },
    ];

    for (const admin of admins) {
      const existingAdmin = await Admin.findOne({ email: admin.email });

      if (!existingAdmin) {
        const hashedPassword = await Encrypt(admin.password);
        await Admin.create({ ...admin, password: hashedPassword });
        console.log("Admin Created");
      }
    }
  } catch (error) {
    console.log("Error creating admin ::::", error);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Enter your valid email and password!",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found!",
      });
    }

    const verifyPassword = await Decrypt(password, admin.password);

    if (!verifyPassword) {
      return res.status(400).json({
        success: false,
        message: "Password did'nt match! Enter correct Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        username: admin.username,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET_ADMIN,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY_ADMIN || "30m",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Admin logged In",
      token,
      admin: {
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("User creation error:", error);
    return res.status(500).json({
      message: "Server error while admin login",
      success: false,
    });
  }
}
