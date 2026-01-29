import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Optional for Google OAuth users
  },
  googleId: {
    type: String,
    default: null, // Google OAuth user ID
  },
  role: {
    type: String,
    enum: ["owner", "user"],
    default: "user",
  },
  image: {
    type: String,
    default: "",
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
