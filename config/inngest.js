import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "@/models/User";

export const inngest = new Inngest({ id: "mactech-next" });

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    console.log("Received user.created event:", JSON.stringify(event, null, 2));

    try {
      await connectDB();
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses?.[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        imageUrl: image_url,
      };

      await User.create(userData);
      console.log("✅ User created:", userData);
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  }
);

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("Received user.updated event:", JSON.stringify(event, null, 2));

    try {
      await connectDB();
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        email: email_addresses?.[0]?.email_address || "",
        imageUrl: image_url,
      };

      await User.findByIdAndUpdate(id, userData, { new: true, upsert: true });
      console.log("✅ User updated:", id);
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw error;
    }
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("Received user.deleted event:", JSON.stringify(event, null, 2));

    try {
      await connectDB();
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      console.log("✅ User deleted:", id);
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  }
);