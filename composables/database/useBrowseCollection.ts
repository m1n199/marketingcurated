import mongoose from "mongoose";
import { useDatabase } from "~/composables/database/useDatabase";

const BrowseSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  feature: String,
  filter: String,
  view_count: Number,
});

export interface BrowseItem {
  name: string;
  url: string;
  description: string;
  feature: string;
  filter: string;
  view_count: number;
}
const Limit = 10;
const Browse =  mongoose.models.Browse || mongoose.model('Browse', BrowseSchema);

const getBrowseItems = async () => {
  await useDatabase();
  const list = await Browse.find().limit(Limit);
  if (list) return list as BrowseItem[];
  return [];
};

const getBrowseItemById = async (id: string) => {
  await useDatabase();
  const item = await Browse.findById(id);
  if (item) return item as BrowseItem;
  return null;
};

const getBrowseItemsByFeature = async (feature: string, index: number) => {
  await useDatabase();
  const list = await Browse.find({ feature }).skip(index).limit(Limit);
  if (list) return list as BrowseItem[];
  return [];
};

const getBrowseItemsByFilter = async (filter: string, index: number) => {
  await useDatabase();
  const list = await Browse.find({ filter }).skip(index).limit(Limit);
  if (list) return list as BrowseItem[];
  return [];
};

const getBrowseItemsByFeatureAndFilter = async (
  feature: string,
  filter: string,
  index: number
) => {
  await useDatabase();
  const list = await Browse.find({
    feature,
    filter,
  }).skip(index).limit(Limit);
  if (list) return list as BrowseItem[];
  return [];
};

const putBrowseItem = async (data: BrowseItem) => {
  await useDatabase();
  return Browse.create(data);
};

const deleteBrowseItem = async (id: string) => {
  await useDatabase();
  return Browse.findByIdAndDelete(id);
};

const updateBrowseItem = async (id: string, data: BrowseItem) => {
  await useDatabase();
  return Browse.findByIdAndUpdate(id, data);
};

// use query on name, feature and filter fields
const getBrowseSearchSuggestions = async (query: string) => {
  await useDatabase();
  const list = await Browse.find({
    $or: [
      { name: { $regex: query, $options: "i" } },
      { feature: { $regex: query, $options: "i" } },
      { filter: { $regex: query, $options: "i" } },
    ],
  })
    .limit(10)
    .lean();
  if (list) return list as unknown as BrowseItem[];
  return [];
};

export function useBrowseCollection() {
  return {
    Browse,
    getBrowseItems,
    getBrowseItemById,
    getBrowseItemsByFeature,
    getBrowseItemsByFilter,
    getBrowseItemsByFeatureAndFilter,
    putBrowseItem,
    deleteBrowseItem,
    updateBrowseItem,
  };
}
