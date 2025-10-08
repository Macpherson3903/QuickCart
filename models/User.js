import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    imageUrl: { type: String, required: true },
    cartItems: { type: Array, default: [] },
}, { minimize: false })

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User