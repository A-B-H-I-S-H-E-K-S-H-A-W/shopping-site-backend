import jwt from "jsonwebtoken";

export const generateUserAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN_SECRET_USER, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY_USER || "15m",
  });
};

export const generateUserRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN_SECRET_USER, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY_USER || "7d",
  });
};

export const verifyRefreshToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, error: err };
  }
};
