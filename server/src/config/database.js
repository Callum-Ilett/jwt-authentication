import mongoose from "mongoose";

let database;

export const connectToDatabase = () => {
  const { MONGO_URI } = process.env;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  if (database) return;

  mongoose.connect(MONGO_URI, options);

  database = mongoose.connection;

  database.once("open", () => console.log("MongoDB Connected!"));
  database.once("error", () => console.log("Failed to connec to to database!"));
};

export const disconnectDatabase = () => {
  if (!database) return;

  mongoose.disconnect();
};
