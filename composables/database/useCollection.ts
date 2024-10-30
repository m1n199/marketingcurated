import { useDatabase } from "./useDatabase"

// const Collection = 

// const getCollectionList = async () => {
//   await useDatabase();
//   if (db) return db.listCollections().toArray();
//   return [];
// } 

// const getCollection = async (name: string) => {
//   await useDatabase();

//   if (db) return db.collection(name);
//   return null;
// }

// const createCollection = async (name: string) => {
//   await useDatabase();

//   if (db) return db.createCollection(name);
//   return null;
// }

// const dropCollection = async (name: string) => {
//   await useDatabase();

//   if (db) return db.dropCollection(name);
//   return null;
// }

// const renameCollection = async (oldName: string, newName: string) => {
//   await useDatabase();

//   if (db) return db.collection(oldName).rename(newName);
//   return null;
// }

export function useCollection() {
  return {
    // getCollectionList,
    // getCollection,
    // createCollection,
    // dropCollection,
    // renameCollection,
  }
}