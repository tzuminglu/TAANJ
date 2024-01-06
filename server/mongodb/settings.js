// the first one url address is the web server, the second one is local server
const mongoURL =
  "mongodb+srv://user01:wrWCBeX1WtssST6J@cluster0.ja5dufq.mongodb.net/" ||
  "mongodb://127.0.0.1:27017/";

export const mongoConfig = {
  serverUrl: mongoURL,
  database: "TAANJ",
};

// export const mongoConfig = {
//   serverUrl: 'mongodb://localhost:27017/',
//   database: 'apiBasedBlog'
// };
