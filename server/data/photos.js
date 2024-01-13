import { ObjectId } from "mongodb";
import { photo } from "../mongodb/mongoCollection.js";

const exportedMethods = {
  async getAllPhotos() {
    const photoCollection = await photo();
    try {
      // return in reversed order
      return await photoCollection.find({}, { sort: { _id: -1 } }).toArray();
    } catch (error) {
      throw "Request Not found";
    }
  },

  async getPhotoById(_id) {
    const photoCollection = await photo();
    try {
      return await photoCollection.findOne({ _id: new ObjectId(_id) });
    } catch (error) {
      throw "Request Not found";
    }
  },

  /**
   *
   * @param {Object} photo : The object includes the gallery's name and an array with fields for the links to the photos.
   * @returns:  {"acknowledged": {Boolean}, "insertedId":{String Id}}
   */
  async addPhoto(newPhoto) {
    const photoCollection = await photo();
    try {
      return await photoCollection.insertOne(newPhoto);
    } catch (error) {
      throw "The request to create a new photo failed";
    }
  },

  /**
   *
   * @param {Object} updatePhoto: The object contains updated information for the gallery name and an array with fields for the links to the photos.
   * @returns: photo: {_id: {String Id},name: {String}, imageURL:[Link]}
   */
  async updatePhoto(updatePhoto) {
    const photoCollection = await photo();
    const { id, ...updateField } = updatePhoto;

    try {
      const updatedInfo = await photoCollection.findOneAndReplace(
        {
          _id: new ObjectId(id),
        },
        updateField,
        { returnDocument: "after" }
      );
      return updatedInfo;
    } catch (error) {
      throw "Update failed";
    }
  },

  async deletePhoto(id) {
    const photoCollection = await photo();
    try {
      return await photoCollection.findOneAndDelete({
        _id: new ObjectId(id),
      });
    } catch (error) {
      throw "Deletion failed";
    }
  },
};

export default exportedMethods;
