import mongoose from "mongoose";
const { model, Schema } = mongoose;

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  refreshToken: { type: String, select: false },
  __v: { type: Number, select: false },
});

const User = model("User", UserSchema);

export default User;
