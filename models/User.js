import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    cartItems: { type: Object, default: [] },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, { minimize: false })

const User = mongoose.models.user || mongoose.model("User", UserSchema);

export default User;