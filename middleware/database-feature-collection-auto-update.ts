import { defineNuxtRouteMiddleware } from "#imports";
// import { useBrowseCollection } from "~/composables/database/useBrowseCollection";
// import { useDatabase } from "~/composables/database/useDatabase";
// import generateBrowseDummyData from "~/utils/generateBrowseDummyData";

// async function updateFeatureCollection() {
//   const { Browse } = useBrowseCollection();
//   try {
//     await Browse.aggregate([
//       {
//         $group: {
//           _id: "$feature",
//           filters: { $addToSet: "$filter" },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           name: "$_id",
//           filters: 1,
//         },
//       },
//       {
//         $merge: {
//           into: "features",
//           on: "name",
//           whenMatched: "replace",
//           whenNotMatched: "insert",
//         },
//       },
//     ]).exec();
//   } catch (error) {
//     console.error("Error updating feature collection:", error);
//   }
// }

// (async () => {
//   await useDatabase();
//   await generateBrowseDummyData(); // Generate some dummy data
//   await updateFeatureCollection(); // Initial population of the features collection

//   const { Browse } = useBrowseCollection();

//   // Function to handle changes with debouncing
//   let debounceTimeout: NodeJS.Timeout | null = null;
//   const handleBrowseChange = () => {
//     if (debounceTimeout) clearTimeout(debounceTimeout);
//     debounceTimeout = setTimeout(() => {
//       updateFeatureCollection();
//     }, 3000); // Debounce time of 3 seconds
//   };

//   // Watch for changes in the Browse collection
//   Browse.watch().on("change", (change) => {
//     if (
//       change.operationType === "insert" ||
//       change.operationType === "update" ||
//       change.operationType === "replace" ||
//       change.operationType === "delete"
//     ) {
//       handleBrowseChange();
//     }
//   });
//   console.log("Feature collection auto-update middleware initialized");
// })();

export default defineNuxtRouteMiddleware((to, from) => {});
