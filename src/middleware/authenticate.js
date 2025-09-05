import jwt from "jsonwebtoken";

//accesstoken
export function authenticate(role = "user") {
  return async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token missing",
        statusCode: 401,
      });
    }

    const secretMap = {
      user: process.env.JWT_ACCESS_TOKEN_SECRET_USER,
      admin: process.env.JWT_ACCESS_TOKEN_SECRET_ADMIN,
    };

    try {
      const decoded = jwt.verify(token, secretMap[role]);

      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
}
