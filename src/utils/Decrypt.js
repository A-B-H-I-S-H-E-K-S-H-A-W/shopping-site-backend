import bcrypt from "bcrypt";

async function Decrypt(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log("Error in password decryption");
    throw error;
  }
}

export default Decrypt;
