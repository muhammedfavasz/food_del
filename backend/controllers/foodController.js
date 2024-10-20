import { response } from "express";
import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  // Corrected to use req.file.filename for the saved image
  let image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename, // Save the image filename in the image field
    category: req.body.category, // Save the category as passed in the request body
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Adding Food" });
  }
};
// all food list
const foodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};
//remove food item
const removeFood = async (req, res) => {
    try {
      // Find the food item by ID from the request body
      const food = await foodModel.findById(req.body.id);
  
      if (!food) {
        return res.json({ success: false, message: "Food item not found" });
      }
  
      // Delete the image file associated with the food item
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "Error removing image file" });
        }
      });
  
      // Remove the food item from the database
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error Removing Food" });
    }
  };
export { addFood, foodList, removeFood };
