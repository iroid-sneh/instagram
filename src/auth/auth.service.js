import argon2 from "argon2";
import db from "../../models/index";
const User = db.user;
import jwt from "jsonwebtoken";
class authService {
    /**
     * @description: User Signup
     * @param {*} req
     * @param {*} res
     */
    static async signup(req, res) {
        try {
            const { username, email, password } = req.body;

            // Basic validation
            if (!username || !email || !password) {
                return res
                    .status(400)
                    .json({ message: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash password
            const hashedPassword = await argon2.hash(password);

            // Create new user
            const user = await User.create({
                userName: username,
                email: email,
                password: hashedPassword,
            });

            return res.status(201).json({ success: true, data: user });
        } catch (error) {
            console.error("Error during signup:", error);
            return res
                .status(500)
                .json({ message: "Server error. Please try again later." });
        }
    }

    /**
     * @description: User login
     * @param {*} req
     * @param {*} res
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Basic validation
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "All fields are required" });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (!existingUser) {
                return res
                    .status(400)
                    .json({ message: "User does not exists" });
            }

            // Hash password
            const checkPassword = await argon2.verify(
                existingUser.password,
                password
            );

            if (!checkPassword)
                return res.status(401).json({ message: "Wrong Password" });

            const payload = {
                id: existingUser.id,
                email: existingUser.email,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1y",
            });

            return res.status(200).json({
                success: true,
                auth: {
                    tokenType: "Bearer",
                    token: token,
                },
            });
        } catch (error) {
            console.error("Error during login:", error);
            return res
                .status(500)
                .json({ message: "Server error. Please try again later." });
        }
    }
}

export default authService;
