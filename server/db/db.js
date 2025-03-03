import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb+srv://DEEKSHITH:deeku7208@cluster1.gbq6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/Note_app");
        console.log("Connected to MongoDB");

    } catch(error){
        console.log("Error connecting to MongoDB",error.message);
    }
}

export default connectDB;