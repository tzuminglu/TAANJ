import { upcomingEvent } from "../mongodb/mongoCollection.js";
import validation from "../tasks/helper.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

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
    // console.log(startValue, end);
    // startValue = dayjs(["$d"]).format("YYYY-MM-DDTHH:mm:ss");
    // endValue = dayjs(endValue["$d"]).format("YYYY-MM-DDTHH:mm:ss");
    startValue = dayjs(startValue)
      .tz("America/New_York")
      .format("YYYY-MM-DDTHH:mm:ss");
    endValue = dayjs(endValue)
      .tz("America/New_York")
      .format("YYYY-MM-DDTHH:mm:ss");

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

  async updatePost(
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
    startValue = dayjs(startValue)
      .tz("America/New_York")
      .format("YYYY-MM-DDTHH:mm:ss");
    endValue = dayjs(endValue)
      .tz("America/New_York")
      .format("YYYY-MM-DDTHH:mm:ss");

    const upcomingEventCollection = await upcomingEvent();
    let newPost = {
      name,
      description,
      startValue,
      endValue,
      location,
      photo,
      link1,
      link2,
    };
    let updatedInfo = await upcomingEventCollection.findOneAndUpdate(
      { _id },
      { $set: newPost },
      { returnDocument: "after" }
    );
    if (!updatedInfo) throw { message: "Error: Insert failed!" };
    return updatedInfo;
  },

  async deletePost() {
    let _id = "0";
    const upcomingEventCollection = await upcomingEvent();
    let deletedInfo = await upcomingEventCollection.findOneAndDelete({ _id });
    if (!deletedInfo) throw "Bad request";
    return deletedInfo;
  },

  async getPostById(id) {
    let _id = id;
    const upcomingEventCollection = await upcomingEvent();
    const post = await upcomingEventCollection
      .findOne({ _id })
      .catch((error) => {
        console.log(error);
        error.message;
      });

    return post;
  },
};

export default exportedMethods;
