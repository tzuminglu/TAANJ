import { organization, sponsor } from "../mongodb/mongoCollection.js";
import { ObjectId } from "mongodb";

const exportedMethods = {
  // organization

  /**
   *
   * @param {object} affair
   */
  async addorg(org) {
    const organizationCollection = await organization();
    try {
      await organizationCollection.insertOne(org);
    } catch (error) {
      throw "Unable to add this organization";
    }
  },

  async getAllOrg() {
    const organizationCollection = await organization();
    try {
      const orgs = await organizationCollection.find({}).toArray();
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
    const organizationCollection = await organization();
    try {
      return await organizationCollection.findOne({ _id: new ObjectId(_id) });
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
    const organizationCollection = await organization();
    const { _id, ...updateOrg } = newOrg;
    try {
      const updateInfo = await organizationCollection.findOneAndReplace(
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
    const organizationCollection = await organization();
    try {
      return await organizationCollection.findOneAndDelete({
        _id: new ObjectId(_id),
      });
    } catch (error) {
      throw "Deletion failed";
    }
  },

  // sponsor
  async addsponsor(sponsorData) {
    const sponsorCollection = await sponsor();
    try {
      return await sponsorCollection.insertOne(sponsorData);
    } catch (error) {
      throw "Unable to add this sponsor";
    }
  },

  async getAllSponsors() {
    const sponsorCollection = await sponsor();
    try {
      const sponsors = await sponsorCollection.find({}).toArray();
      return sponsors;
    } catch (error) {
      throw "Unable to get the sponsors";
    }
  },

  async getSponsorById(_id) {
    const sponsorCollection = await sponsor();
    try {
      const sponsors = await sponsorCollection.findOne({
        _id: new ObjectId(_id),
      });
      return sponsors;
    } catch (error) {
      throw "Unable to get the sponsors";
    }
  },

  /**
   *
   * @param {string} id
   * @param {object} newOrg
   * @returns
   */
  async updateSponsorById(id, newSponsor) {
    const sponsorCollection = await sponsor();
    const { _id, ...updateSponsor } = newSponsor;
    try {
      const updateInfo = await sponsorCollection.findOneAndReplace(
        { _id: new ObjectId(id) },
        updateSponsor,
        { returnDocument: "after" }
      );
      return updateInfo;
    } catch (error) {
      throw "Update failed";
    }
  },

  async deleteSponsorById(_id) {
    const sponsorCollection = await sponsor();
    try {
      return await sponsorCollection.findOneAndDelete({
        _id: new ObjectId(_id),
      });
    } catch (error) {
      throw "Deletion failed";
    }
  },
};

export default exportedMethods;
