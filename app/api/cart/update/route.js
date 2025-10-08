import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const auth = getAuth(request);
    const userId = auth?.userId;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized user" });
    }

    const { cartData } = await request.json();
    if (!cartData) {
      return NextResponse.json({ success: false, message: "No cart data provided" });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}