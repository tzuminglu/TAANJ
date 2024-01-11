import { about } from "../mongodb/mongoCollection.js";

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
};

export default exportedMethods;
