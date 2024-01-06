import { upcomingEvent } from "../mongodb/mongoCollection.js";
import { ObjectId } from "mongodb";
import validation from "../tasks/helper.js";

const exportedMethods = {
  async addPost(title, body, time, location, info, photo) {
    let _id = "0";
    title = validation.checkString(title, "title");
    body = validation.checkString(body, "body");
    time = validation.checkString(time, "time");
    location = validation.checkString(location, "location");
    info = validation.checkString(info, "info");
    photo - validation.checkString(photo, "photo");

    let newPost = {
      title,
      body,
      time,
      location,
      info,
      photo,
    };

    const upcomingEventCollection = await upcomingEvent();
    let insertedInfo;
    if (await upcomingEventCollection.findOne({ _id: "0" })) {
      insertedInfo = await upcomingEventCollection.findOneAndUpdate(
        { _id },
        { $set: newPost },
        { returnDocument: "after" }
      );
      if (!insertedInfo.insertedId) throw "Error: Insert failed!";
    } else {
      insertedInfo = await upcomingEventCollection.insertOne({
        _id,
        ...newPost,
      });
    }

    return this.getPostById(insertedInfo.insertedId.toString());
  },

  async getPostById(id) {
    let _id = id;
    const upcomingEventCollection = await upcomingEvent();
    const post = await upcomingEventCollection.findOne({ _id });

    if (!post) throw "Error: Post not found";
    return post;
  },
};
export default exportedMethods;
