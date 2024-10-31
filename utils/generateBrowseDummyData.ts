import { useBrowseCollection } from "~/composables/database/useBrowseCollection";
import { useDatabase } from "~/composables/database/useDatabase";

interface BrowseItem {
  name: string;
  url: string;
  description: string;
  feature: string;
  filter: string;
  view_count: number;
}

const dimensions = [
  "500x500",
  "400x400",
  "300x300",
  "200x200",
  "100x100",
  "550x600",
  "450x500",
  "780x800",
  "600x700",
  "564x500",
  "1260x500",
];

const dummyFeatures = [
  {
    name: "Color",
    filters: [
      { name: "Red", count: 10 },
      { name: "Blue", count: 20 },
      { name: "Green", count: 30 },
      { name: "Yellow", count: 40 },
      { name: "Black", count: 50 },
      { name: "White", count: 60 },
      { name: "Purple", count: 70 },
      { name: "Pink", count: 80 },
      { name: "Orange", count: 90 },
      { name: "Brown", count: 100 },
      { name: "Gray", count: 110 },
      { name: "Cyan", count: 120 },
      { name: "Magenta", count: 130 },
      { name: "Lime", count: 140 },
      { name: "Teal", count: 150 },
      { name: "Indigo", count: 160 },
    ],
  },
  {
    name: "Size",
    filters: [
      { name: "xs", count: 10 },
      { name: "sm", count: 20 },
      { name: "md", count: 30 },
      { name: "lg", count: 40 },
      { name: "xl", count: 50 },
      { name: "2xl", count: 60 },
      { name: "3xl", count: 70 },
      { name: "4xl", count: 80 },
      { name: "5xl", count: 90 },
      { name: "6xl", count: 100 },
      { name: "7xl", count: 110 },
      { name: "8xl", count: 120 },
      { name: "9xl", count: 130 },
      { name: "10xl", count: 140 },
      { name: "11xl", count: 150 },
      { name: "12xl", count: 160 },
    ],
  },
  {
    name: "What Type",
    filters: [
      { name: "Regular", count: 10 },
      { name: "Bold", count: 20 },
      { name: "Italic", count: 30 },
      { name: "Underline", count: 40 },
      { name: "Overline", count: 50 },
      { name: "Line Through", count: 60 },
      { name: "Dashed", count: 70 },
      { name: "Dotted", count: 80 },
      { name: "Double", count: 90 },
      { name: "Groove", count: 100 },
      { name: "Ridge", count: 110 },
      { name: "Inset", count: 120 },
      { name: "Outset", count: 130 },
      { name: "None", count: 140 },
      { name: "Hidden", count: 150 },
      { name: "Solid", count: 160 },
    ],
  },
  {
    name: "What Shape",
    filters: [
      { name: "Square", count: 10 },
      { name: "Circle", count: 20 },
      { name: "Rectangle", count: 30 },
      { name: "Triangle", count: 40 },
      { name: "Oval", count: 50 },
      { name: "Star", count: 60 },
      { name: "Heart", count: 70 },
      { name: "Diamond", count: 80 },
      { name: "Hexagon", count: 90 },
      { name: "Octagon", count: 100 },
      { name: "Rhombus", count: 110 },
      { name: "Parallelogram", count: 120 },
      { name: "Trapezoid", count: 130 },
      { name: "Pentagon", count: 140 },
      { name: "Heptagon", count: 150 },
      { name: "Nonagon", count: 160 },
    ],
  },
  {
    name: "What Material",
    filters: [
      { name: "Wood", count: 10 },
      { name: "Metal", count: 20 },
      { name: "Plastic", count: 30 },
      { name: "Glass", count: 40 },
      { name: "Ceramic", count: 50 },
      { name: "Paper", count: 60 },
      { name: "Fabric", count: 70 },
      { name: "Leather", count: 80 },
      { name: "Stone", count: 90 },
      { name: "Concrete", count: 100 },
      { name: "Clay", count: 110 },
      { name: "Rubber", count: 120 },
      { name: "Silicone", count: 130 },
      { name: "Fiber", count: 140 },
      { name: "Foam", count: 150 },
      { name: "Wax", count: 160 },
    ],
  },
  {
    name: "What Brand",
    filters: [
      { name: "Nike", count: 10 },
      { name: "Adidas", count: 20 },
      { name: "Puma", count: 30 },
      { name: "Reebok", count: 40 },
      { name: "Under Armour", count: 50 },
      { name: "New Balance", count: 60 },
      { name: "Skechers", count: 70 },
      { name: "Asics", count: 80 },
      { name: "Converse", count: 90 },
      { name: "Vans", count: 100 },
      { name: "Fila", count: 110 },
      { name: "Crocs", count: 120 },
      { name: "Birkenstock", count: 130 },
      { name: "Dr. Martens", count: 140 },
      { name: "Timberland", count: 150 },
      { name: "Salomon", count: 160 },
    ],
  },
  {
    name: "What Style",
    filters: [
      { name: "Casual", count: 10 },
      { name: "Formal", count: 20 },
      { name: "Sport", count: 30 },
      { name: "Outdoor", count: 40 },
      { name: "Indoor", count: 50 },
      { name: "Beach", count: 60 },
      { name: "Party", count: 70 },
      { name: "Wedding", count: 80 },
      { name: "Travel", count: 90 },
      { name: "Work", count: 100 },
      { name: "Gym", count: 110 },
      { name: "Yoga", count: 120 },
      { name: "Dance", count: 130 },
      { name: "Skate", count: 140 },
      { name: "Hiking", count: 150 },
      { name: "Running", count: 160 },
    ],
  },
  {
    name: "What Pattern",
    filters: [
      { name: "Solid", count: 10 },
      { name: "Striped", count: 20 },
      { name: "Checkered", count: 30 },
      { name: "Polka Dot", count: 40 },
      { name: "Floral", count: 50 },
      { name: "Geometric", count: 60 },
      { name: "Abstract", count: 70 },
      { name: "Animal Print", count: 80 },
      { name: "Camouflage", count: 90 },
      { name: "Tie Dye", count: 100 },
      { name: "Ombre", count: 110 },
      { name: "Gradient", count: 120 },
      { name: "Marble", count: 130 },
      { name: "Glitter", count: 140 },
      { name: "Metallic", count: 150 },
      { name: "Neon", count: 160 },
    ],
  },
  {
    name: "What Theme",
    filters: [
      { name: "Nature", count: 10 },
      { name: "Space", count: 20 },
      { name: "Ocean", count: 30 },
      { name: "Desert", count: 40 },
    ],
  },
  {
    name: "What Season",
    filters: [
      { name: "Spring", count: 10 },
      { name: "Summer", count: 20 },
      { name: "Autumn", count: 30 },
      { name: "Winter", count: 40 },
    ],
  },
  {
    name: "What Occasion",
    filters: [
      { name: "Birthday", count: 10 },
      { name: "Anniversary", count: 20 },
      { name: "Wedding", count: 30 },
      { name: "Graduation", count: 40 },
      { name: "Prom", count: 50 },
      { name: "Party", count: 60 },
      { name: "Festival", count: 70 },
      { name: "Holiday", count: 80 },
      { name: "Vacation", count: 90 },
      { name: "Travel", count: 100 },
      { name: "Work", count: 110 },
      { name: "Gym", count: 120 },
      { name: "Yoga", count: 130 },
      { name: "Dance", count: 140 },
      { name: "Skate", count: 150 },
      { name: "Hiking", count: 160 },
    ],
  },
];

function generateUrl(feature: string, filter: string, i: number) {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  const dimension = dimensions[Math.floor(Math.random() * dimensions.length)];
  return `https://placehold.co/${dimension}/${color}/ffffff?text=${feature}+${filter}+${i}`;
}

function generateBrowseList(feature: string, filter: string) {
  return Array.from({ length: 100 }, (_, i) => ({
    name: `Item ${i}`,
    url: generateUrl(feature, filter, i),
    description: `Description for item ${i}`,
    feature,
    filter,
    view_count: Math.floor(Math.random() * 1000),
  }));
}

let browseList: BrowseItem[] = [];

dummyFeatures.forEach((feature) => {
  feature.filters.forEach((filter) => {
    browseList = browseList.concat(
      generateBrowseList(feature.name, filter.name)
    );
  });
});

const init = async (list: BrowseItem[]) => {
  await useDatabase();
  const { Browse } = useBrowseCollection();
  await Browse.deleteMany();
  return Browse.insertMany(list);
};

export default async function generateBrowseDummyData() {
  await init(browseList);
}
