import { upcomingEvent } from "../mongodb/mongoCollection.js";
import validation from "../tasks/helper.js";
import dayjs from "dayjs";

const exportedMethods = {
  async addPost(
    name,
    description,
    startValue,
    endValue,
    location,
    photo,
    link1,
    link2
  ) {
    let _id = "0";
    // name = validation.checkString(name, "name");
    // description = validation.checkString(description, "description");
    // startValue = validation.checkString(startValue, "startValue");
    // endValue = validation.checkString(endValue, "endValue");
    // location = validation.checkString(location, "location");
    // photo = validation.checkString(photo, "photo");
    startValue = dayjs(startValue["$d"]).format("YYYY-MM-DDTHH:mm:ss");
    endValue = dayjs(endValue["$d"]).format("YYYY-MM-DDTHH:mm:ss");

    const newPost = {
      name,
      description,
      startValue,
      endValue,
      location,
      photo,
      link1,
      link2,
    };

    const upcomingEventCollection = await upcomingEvent();
    let insertedInfo;
    if (await upcomingEventCollection.findOne({ _id: "0" })) {
      insertedInfo = await upcomingEventCollection.findOneAndUpdate(
        { _id },
        { $set: newPost },
        { returnDocument: "after" }
      );
      if (!insertedInfo) throw "Error: Create failed!";
      return insertedInfo;
    } else {
      insertedInfo = await upcomingEventCollection.insertOne({
        _id,
        ...newPost,
      });
      return this.getPostById(insertedInfo.insertedId.toString());
    }
  },

  async updatePost(name, description, startValue, endValue, location, photo) {
    let _id = "0";
    name = validation.checkString(name, "name");
    description = validation.checkString(description, "description");
    startValue = validation.checkString(startValue, "startValue");
    endValue = validation.checkString(endValue, "endValue");
    location = validation.checkString(location, "location");
    photo = validation.checkString(photo, "photo");

    const upcomingEventCollection = await upcomingEvent();
    let newPost = {
      name,
      description,
      startValue,
      endValue,
      location,
      photo,
    };
    let updatedInfo = await upcomingEventCollection.findOneAndUpdate(
      { _id },
      { $set: newPost },
      { returnDocument: "after" }
    );
    if (!updatedInfo) throw "Error: Insert failed!";
    return updatedInfo;
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
