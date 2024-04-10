import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic: string;
  generateToken: () => string;
};

const userSchema = new mongoose.Schema<UserType>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: 1000 * 60 * 60 * 24, //1day
    }
  );
  return token;
};

const User = mongoose.model<UserType>("User", userSchema);
export default User;
