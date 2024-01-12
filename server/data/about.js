import { about } from "../mongodb/mongoCollection.js";
import { ObjectId } from "mongodb";

const exportedMethods = {
  /**
   *
   * @param {object} affair
   */
  async addorg(organization) {
    const aboutCollection = await about();
    try {
      await aboutCollection.insertOne(organization);
    } catch (error) {
      throw "Unable to add this organization";
    }
  },

  async getAllOrg() {
    const aboutCollection = await about();
    try {
      const orgs = await aboutCollection.find({}).toArray();
      return orgs;
    } catch (error) {
      throw "Request Not found";
    }
  },

  async getOrgById(_id) {
    const aboutCollection = await about();
    try {
      return await aboutCollection.findOne({ _id });
    } catch (error) {
      throw "Request Not found";
    }
  },

  async updateOrgById(_id, newOrg) {
    const aboutCollection = await about();
    try {
      const updateInfo = await aboutCollection.findOneAndUpdate(
        { _id },
        { $set: { newOrg } },
        { returnDocument: "after" }
      );
      return updateInfo;
    } catch (error) {
      throw "Update failed";
    }
  },

  async deleteOrgById(_id) {
    const aboutCollection = await about();
    try {
      return await aboutCollection.findOneAndDelete({ _id: new ObjectId(_id) });
    } catch (error) {
      throw "Deletion failed";
    }
  },
};

export default exportedMethods;
