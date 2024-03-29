import { dbConnection } from "./mongoConnection.js";

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const upcomingEvent = getCollectionFn("upcomingEvent");
export const pastEvent = getCollectionFn("pastEvent");
export const organization = getCollectionFn("organization");
export const sponsor = getCollectionFn("sponsor");
export const photo = getCollectionFn("photo");
export const members = getCollectionFn("members");
