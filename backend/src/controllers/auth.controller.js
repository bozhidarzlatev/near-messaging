import { sendWelcomeEmails } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at lesast 6 characters!" });
        }

        const emailReges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailReges.test(email)) {
            return res.status(400).json({ message: "Invalid email format!" });
        }

        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exist!" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullName, email, password: hashedPassword });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

            try {
                await sendWelcomeEmails(savedUser.email, savedUser.fullNamem, ENV.CLIENT_URL)
            } catch (error) {
                console.log("Failed to send welcome email:", error);

            }

        } else {
            res.status(400).json({ message: "Invalid user!" });
        }



    } catch (error) {
        console.log(`Error in signup`, error);
        res.status(500).json({ message: "Internal server error!", error: error });

    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required!" })
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials!" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials!" })

        generateToken(user._id, res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log(`Error in login controller:`, error);
        res.status(500).json({ message: "Internal server error!" })


    }
}

const logout = (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Log out successfully!" })
}

const updateProfile = async (req, res) => {

    try {
        const { profilePic } = req.body;
            
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required!" })

        const userId = req.user._id;
        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }).select("-password")
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(`Error in updateProfile:`, error);
        res.status(500).json({ message: "Internal server error!" })
    }
}

export const authController = {
    signup,
    login,
    logout,
    updateProfile
}