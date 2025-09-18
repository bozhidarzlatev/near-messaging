import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    
    console.log({ fullName, email, password });
    

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

        const newUser = new User({fullName, email, password: hashedPassword});

        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save()
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({ message: "Invalid user!" });
        }
        
    } catch (error) {
        console.log(`Error in signup`, error);
        res.status(500).json({ message: "Internal server error!", error: error });

    }
}



export const authController = {
    signup,
}