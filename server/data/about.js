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

  /**
   *
   * @param {string} _id
   * @returns
   */
  async getOrgById(_id) {
    const aboutCollection = await about();
    try {
      return await aboutCollection.findOne({ _id });
    } catch (error) {
      throw "Request Not found";
    }
  },

  /**
   *
   * @param {string} _id
   * @param {object} newOrg
   * @returns
   */
  async updateOrgById(id, newOrg) {
    const aboutCollection = await about();
    const { _id, ...updateOrg } = newOrg;
    try {
      const updateInfo = await aboutCollection.findOneAndReplace(
        { _id: new ObjectId(id) },
        updateOrg,
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
