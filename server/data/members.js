import { members } from "../mongodb/mongoCollection.js";
import { ObjectId } from "mongodb";

const exportedMethods = {
  /**
   *
   * @param {Object} member : {title, name, contact, imageURL}
   * @returns: {acknowledge, insertedId}
   */
  async addMember(member) {
    const membersCollection = await members();
    try {
      return await membersCollection.insertOne(member);
    } catch (error) {
      throw "Unable to add this organization";
    }
  },

  /**
   *
   * @returns : Return all documentations in the members' collection.
   */
  async getAllMembers() {
    const membersCollection = await members();
    try {
      const members = await membersCollection.find({}).toArray();
      return members;
    } catch (error) {
      throw "Request Not found";
    }
  },

  /**
   *
   * @param {String} _id : String Id
   * @returns : Return the result of the finding request.
   */
  async getMemberById(_id) {
    const membersCollection = await members();
    try {
      return await membersCollection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw "Request Not found";
    }
  },

  /**
   *
   * @param {String} _id :string Id
   * @param {Object} newInfo :New values that will replace the original values
   * @returns :updated documentation
   */
  async updateMemberById(id, newInfo) {
    const membersCollection = await members();
    const { _id, ...updateMember } = newInfo;
    try {
      const updateInfo = await membersCollection.findOneAndReplace(
        { _id: new ObjectId(id) },
        updateMember,
        { returnDocument: "after" }
      );
      return updateInfo;
    } catch (error) {
      throw "Update failed";
    }
  },

  /**
   *
   * @param {String} _id :Remove member by using id
   * @returns :return documentation that has been deleted
   */
  async deleteMemberById(_id) {
    const membersCollection = await members();
    try {
      return await membersCollection.findOneAndDelete({
        _id: new ObjectId(_id),
      });
    } catch (error) {
      throw "Deletion failed";
    }
  },
};

export default exportedMethods;
