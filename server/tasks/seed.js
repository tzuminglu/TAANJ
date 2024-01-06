import { dbConnection, closeConnection } from "../mongodb/mongoConnection.js";
import upcomingEvent from "../data/upcomingEvent.js";
const db = await dbConnection();
await db.dropDatabase();

const test_1 = {
  title: "This is a test",
  body: "Test the function",
  time: "01/01/2024",
  location: "No address",
  info: "No further info",
  photo: "123",
};

const newpost = await upcomingEvent.addPost(
  "This is a test",
  "Test the function",
  "01/01/2024",
  "No address",
  "No further info",
  "123"
);

console.log("Done seeding database");
await closeConnection();
