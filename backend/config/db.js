import mongoose from "mongoose";

export const connectDB= async () => {
    await mongoose.connect('mongodb+srv://muhammedfavas1609:muhammedfavas1609@cluster0.g9ltb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log("DB connected");})
}
