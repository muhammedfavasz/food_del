import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Corrected to String and required: true
  email: { type: String, required: true, unique: true }, // Corrected to description, String, and required: true
  password: { type: String, required: true }, // Added image field with type String
  cartData: { type: Object, default: {} }, // Added category field with type String
},{minimize:false});

// Create the model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Export the model
export default userModel;