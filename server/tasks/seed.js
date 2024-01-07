import { dbConnection, closeConnection } from "../mongodb/mongoConnection.js";
import upcomingEvent from "../data/upcomingEvent.js";
const db = await dbConnection();
await db.dropDatabase();

let newpost = await upcomingEvent.addPost(
  "This is a test",
  "Test the function",
  "01/01/2024",
  "No address",
  "No further info",
  "123"
);

newpost = await upcomingEvent.updatePost(
  "This is updated test.",
  "Test updated function",
  "01/02/2024",
  "XXX",
  "None",
  "456"
);

await upcomingEvent.addPost(
  "This is a test",
  "Test the function",
  "01/01/2024",
  "No address",
  "No further info",
  "123"
);

console.log("Done seeding database");
await closeConnection();
