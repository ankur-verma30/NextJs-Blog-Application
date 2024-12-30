import mongoose from "mongoose";

export const connectDB =async ()=>{
    await mongoose.connect("mongodb+srv://ankurverma7619:YmbJoPAw5iRmg1KT@cluster0.m0uwo.mongodb.net/blog-application")
    console.log("MongoDB Connected...")
}

