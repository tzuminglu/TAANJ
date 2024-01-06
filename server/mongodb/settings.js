// the first one url address is the web server, the second one is local server
import dotenv from "dotenv";
dotenv.config();

const mongoURL =
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ja5dufq.mongodb.net/` ||
  "mongodb://127.0.0.1:27017/";

export const mongoConfig = {
  serverUrl: mongoURL,
  database: "TAANJ",
};