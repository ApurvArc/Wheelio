import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vehicle from "../models/Vehicle.js";

// Generate JWT Token
const generateToken = (userId) => {
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: "Fill all the fields" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = generateToken(user._id.toString());
        res.json({ success: true, token });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if user has a password (might be Google-only user)
        if (!user.password) {
            return res.json({ success: false, message: "Please log in with Google" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = generateToken(user._id.toString());
        res.json({ success: true, token });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get User data using JWT Token
export const getUserData = async (req, res) => {
    try {
        const { user } = req;
        res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get All Vehicles for the frontend
export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ isAvailable: true });
        res.json({ success: true, vehicles });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Google OAuth Login (Authorization Code Flow)
export const googleLogin = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.json({ success: false, message: "Authorization code required" });
        }

        const clientId = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

        // Exchange code for tokens
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: "postmessage",
                grant_type: "authorization_code",
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            console.error("Token exchange error:", tokenData);
            return res.json({ success: false, message: "Failed to exchange token" });
        }

        const { id_token, access_token } = tokenData;

        // Verify/Get User Info from ID Token or UserInfo Endpoint
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        const payload = await userResponse.json();

        if (!payload.email) {
            return res.json({ success: false, message: "Failed to get user info" });
        }

        const { sub: googleId, email, name, picture } = payload;

        // Check if user exists
        let user = await User.findOne({ email });
        let isNewUser = false;

        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                if (picture && !user.image) user.image = picture;
                await user.save();
            }
        } else {
            isNewUser = true;
            user = await User.create({
                name: name || "Google User",
                email,
                googleId,
                image: picture || "",
            });
        }

        const token = generateToken(user._id.toString());
        res.json({ success: true, token, isNewUser });

    } catch (error) {
        console.log("Google Login Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update user name
export const updateUserName = async (req, res) => {
    try {
        const { name } = req.body;
        const { user } = req;

        if (!name || name.trim().length < 2) {
            return res.json({ success: false, message: "Please provide a valid name" });
        }

        user.name = name.trim();
        await user.save();
        res.json({ success: true, message: "Name updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};