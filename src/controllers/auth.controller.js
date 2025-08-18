import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";


export async function signup(req, res) {
    const { FullName, Password, Email } = req.body;

    try {
        if (!FullName || !Password || !Email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (Password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(Email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Proceed with saving user or any other logic here
        
const existingUser = await User.findOne({ Email });

if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
}

const idx=Math.floor(Math.random() * 100)+1;
 const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
 
 
    const newUser = await User.create({
      Email,
      FullName,
      Password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.FullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.FullName}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }

const token= jwt.sign({userId:newUser._id}, process.env.JWT_SECRET, { expiresIn: '30d' });

res.cookie('jwt', token, {
    maxAge: 30* 24 * 60 * 60 * 1000, // 30 days 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'Strict', 
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
})
res.status(201).json({ success:true,user:newUser});

    } catch (error) {
        console.error('Error during signup:', error);
         res.status(500).json({ message: 'Internal server error' });
    }
}

export async function login(req, res) {
     try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ Email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await user.matchPassword(Password);
    if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}   

export function logout(req, res) {
    res.clearCookie('jwt' );
      res.status(200).json({ success: true, message: "Logout successful" });
}

export async function onboard(req, res) {
  try {
    const userId = req.user._id;

    const { FullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!FullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !FullName && "FullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try { 
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.FullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.FullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

