import { pastEvent } from "../mongodb/mongoCollection.js";
import { ObjectId } from "mongodb";

const exportedMethods = {
  async getAllPastEvent() {
    const pastEventCollection = await pastEvent();
    try {
      const pastEvents = await pastEventCollection
        .find({})
        .sort({ _id: -1 })
        .limit(5)
        .toArray();
      return pastEvents;
    } catch (error) {
      throw "Request Not found";
    }
  },

  async getPastEventById(_id) {
    const pastEventCollection = await pastEvent();
    try {
      return await pastEventCollection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw "Request Not found";
    }
  },

  async addPastEvent(pastEventData) {
    const pastEventCollection = await pastEvent();
    try {
      return await pastEventCollection.insertOne(pastEventData);
    } catch (error) {
      throw "Unable to add this past event";
    }
  },

  async updatePastEventById(id, newInfo) {
    const pastEventCollection = await pastEvent();
    const { _id, ...updatePastEvent } = newInfo;
    try {
      const updateInfo = await pastEventCollection.findOneAndReplace(
        { _id: new ObjectId(id) },
        updatePastEvent,
        { returnDocument: "after" }
      );
      return updateInfo;
    } catch (error) {
      throw "Update failed";
    }
  },

  async deletePastEventById(_id) {
    const pastEventCollection = await pastEvent();
    try {
      return await pastEventCollection.findOneAndDelete({
        _id: new ObjectId(_id),
      });
    } catch (error) {
      throw "Deletion failed";
    }
  },
};

export default exportedMethods;
