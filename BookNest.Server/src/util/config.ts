import dotenv from "dotenv";

dotenv.config();

export const MONGO_DB = process.env.MONGO_DB || "";
export const PORT = process.env.PORT || "";
