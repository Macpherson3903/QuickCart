import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Clerk User ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: [] }, // can later change to [CartItemSchema]
    isAdmin: { type: Boolean, default: false }, // no need required:true
}, { minimize: false });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;