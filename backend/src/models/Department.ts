import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;
