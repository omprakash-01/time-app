import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Mongoose is Connected to Sever`);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log(`Mongoose is Connected to DB`);
});
mongoose.connection.on("error", () => {
  console.log("Mongoose is showing error while connecting to DB");
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose is disconnected to DB");
});
export default connectDB;
