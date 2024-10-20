import mongoose from "mongoose";

// Define the food schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Corrected to String and required: true
  description: { type: String, required: true }, // Corrected to description, String, and required: true
  price: { type: Number, required: true }, // Added price field with type Number
  image: { type: String, required: true }, // Added image field with type String
  category: { type: String, required: true }, // Added category field with type String
});

// Create the model
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// Export the model
export default foodModel;   
