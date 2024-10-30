import mongoose from "mongoose";
import { useDatabase } from "~/composables/database/useDatabase";
import { useBrowseCollection } from "./useBrowseCollection";

const FeatureSchema = new mongoose.Schema({
  name: String,
  filters: [
    {
      name: String,
      count: Number
    }
  ]
});

export interface FeatureListItem {
  name: string;
  filters: Array<{
    name: string;
    count: number;
  }>
}

const Feature =
  mongoose.models.Feature || mongoose.model("Feature", FeatureSchema);

const getFeatureItems = async () => {
  await useDatabase();
  const list = await Feature.find().select('name filters -_id').lean();
  if (list) return list as unknown as FeatureListItem[];
  return [];
};

const getFeatureItemById = async (id: string) => {
  await useDatabase();
  const item = await Feature.findById(id);
  if (item) return item as FeatureListItem;
  return null;
};

const getFeatureItemByName = async (name: string) => {
  await useDatabase();
  const item = await Feature.findOne({ name });
  if (item) return item as FeatureListItem;
  return null;
};

const putFeatureItem = async (data: FeatureListItem) => {
  await useDatabase();
  return Feature.create(data);
};

const deleteFeatureItem = async (id: string) => {
  await useDatabase();
  return Feature.findByIdAndDelete(id);
};



export function useFeatureCollection() {
  return {
    Feature,
    getFeatureItems,
    getFeatureItemById,
    getFeatureItemByName,
    putFeatureItem,
    deleteFeatureItem,
  };
}
