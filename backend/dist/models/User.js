"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    }
    next();
});
userSchema.methods.generateToken = function () {
    const token = jsonwebtoken_1.default.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 1000 * 60 * 60 * 24, //1day
    });
    return token;
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
