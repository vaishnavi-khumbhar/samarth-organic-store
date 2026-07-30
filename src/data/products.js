import oil1 from "../assets/images/products/oil1.jpg";
import oil2 from "../assets/images/products/oil2.jpg";
import oil3 from "../assets/images/products/oil3.jpg";
import oil4 from "../assets/images/products/3.png";
import oil5 from "../assets/images/products/oil5.jpg";
import oil6 from "../assets/images/products/oil6.png";
import oil7 from "../assets/images/products/oil7.jpg";
import oil8 from "../assets/images/products/oil8.jpg";

// NEW — add these image files in src/assets/images/products/ and import here
// Dummy images (replace with actual images later)
const safflowerOil = oil1;
const castorOil = oil2;
const onionHairOil = oil3;
const curryLeavesOil = oil4;
const jaggeryPowder = oil5;
const jaggeryCandy = oil6;
const liquidJaggery = oil7;
const jaggery = oil8;

const aloeVeraSoap = oil1;
const multaniMittiSoap = oil2;
const neemSoap = oil3;
const detanSoap = oil4;
const charcoalSoap = oil5;

const tulsiHoney = oil6;
const forestHoney = oil7;

const cowGhee = oil8;

export const products = [
  // ---------------- EXISTING OILS ----------------
  // NOTE: category added below so category filtering (Products page /
  // ProductFilter) actually matches these against "Oils".
  { id: 1, name: "Groundnut Oil", slug: "groundnut-oil", category: "Oils", price: "₹399", mrp: "₹440", image: oil1 },
  { id: 2, name: "Sesame Oil", slug: "sesame-oil", category: "Oils", price: "₹499", mrp: "₹540", image: oil2 },
  { id: 3, name: "Coconut Oil", slug: "coconut-oil", category: "Oils", price: "₹349", mrp: "₹380", image: oil3 },
  { id: 4, name: "Sunflower Oil", slug: "sunflower-oil", category: "Oils", price: "₹449", mrp: "₹480", image: oil4 },
  { id: 5, name: "Mustard Oil", slug: "mustard-oil", category: "Oils", price: "₹429", mrp: "₹460", image: oil5 },
  { id: 6, name: "Flexseed Oil", slug: "flexseed-oil", category: "Oils", price: "₹599", mrp: "₹650", image: oil6 },
  { id: 7, name: "Almond Oil", slug: "almond-oil", category: "Oils", price: "₹799", mrp: "₹850", image: oil7 },
  { id: 8, name: "Walnut Oil", slug: "walnut-oil", category: "Oils", price: "₹999", mrp: "₹1050", image: oil8 },

  // ---------------- NEW: OILS ----------------
  {
    id: 9,
    name: "Safflower Oil",
    slug: "safflower-oil",
    category: "Oils",
    price: "₹190",       // default = smallest size, shown on product cards
    mrp: "₹220",
    image: safflowerOil,
    sizes: [
      { label: "500ml", price: 190, mrp: 220 },
      { label: "1 Ltr", price: 350, mrp: 440 },
      { label: "5 Ltr", price: 1700, mrp: 2100 },
    ],
  },
  {
    id: 10,
    name: "Castor Oil",
    slug: "castor-oil",
    category: "Oils",
    price: "₹60",
    mrp: "₹80",
    image: castorOil,
    sizes: [
      { label: "50 ml", price: 60, mrp: 80 },
      { label: "100 ml", price: 110, mrp: 140 },
      { label: "200 ml", price: 180, mrp: 240 },
    ],
  },

  // ---------------- NEW: HAIR OILS ----------------
  {
    id: 11,
    name: "Onion Hair Oil",
    slug: "onion-hair-oil",
    category: "Hair Oils",
    price: "₹120",
    mrp: "₹150",
    image: onionHairOil,
    sizes: [
      { label: "100 ml", price: 120, mrp: 150 },
      { label: "200 ml", price: 210, mrp: 300 },
    ],
  },
  {
    id: 12,
    name: "Curry Leaves Hair Oil",
    slug: "curry-leaves-hair-oil",
    category: "Hair Oils",
    price: "₹120",
    mrp: "₹150",
    image: curryLeavesOil,
    sizes: [
      { label: "100 ml", price: 120, mrp: 150 },
      { label: "200 ml", price: 210, mrp: 300 },
    ],
  },

  // ---------------- NEW: JAGGERY ----------------
  {
    id: 13,
    name: "Jaggery Powder",
    slug: "jaggery-powder",
    category: "Jaggery",
    price: "₹120",
    mrp: "₹150",
    image: jaggeryPowder,
    sizes: [{ label: "500 gm", price: 120, mrp: 150 }],
  },
  {
    id: 14,
    name: "Jaggery Candy",
    slug: "jaggery-candy",
    category: "Jaggery",
    price: "₹130",
    mrp: "₹150",
    image: jaggeryCandy,
    sizes: [{ label: "500 gm", price: 130, mrp: 150 }],
  },
  {
    id: 15,
    name: "Liquid Jaggery",
    slug: "liquid-jaggery",
    category: "Jaggery",
    price: "₹100",
    mrp: "₹150",
    image: liquidJaggery,
    sizes: [
      { label: "90 ml", price: 100, mrp: 150 },
      { label: "600 ml", price: 220, mrp: 250 },
    ],
  },
  {
    id: 16,
    name: "Jaggery",
    slug: "jaggery",
    category: "Jaggery",
    price: "₹100",
    mrp: "₹120",
    image: jaggery,
    sizes: [{ label: "1 kg", price: 100, mrp: 120 }],
  },

  // ---------------- NEW: HANDMADE SOAP ----------------
  {
    id: 17,
    name: "Aloe Vera Soap",
    slug: "aloe-vera-soap",
    category: "Soap",
    price: "₹70",
    mrp: "₹80",
    image: aloeVeraSoap,
    sizes: [{ label: "100 gm", price: 70, mrp: 80 }],
  },
  {
    id: 18,
    name: "Multani Mitti Soap",
    slug: "multani-mitti-soap",
    category: "Soap",
    price: "₹70",
    mrp: "₹80",
    image: multaniMittiSoap,
    sizes: [{ label: "100 gm", price: 70, mrp: 80 }],
  },
  {
    id: 19,
    name: "Neem Soap",
    slug: "neem-soap",
    category: "Soap",
    price: "₹70",
    mrp: "₹80",
    image: neemSoap,
    sizes: [{ label: "100 gm", price: 70, mrp: 80 }],
  },
  {
    id: 20,
    name: "De-tan Soap",
    slug: "de-tan-soap",
    category: "Soap",
    price: "₹100",
    mrp: "₹120",
    image: detanSoap,
    sizes: [{ label: "100 gm", price: 100, mrp: 120 }],
  },
  {
    id: 21,
    name: "Charcoal Soap",
    slug: "charcoal-soap",
    category: "Soap",
    price: "₹80",
    mrp: "₹100",
    image: charcoalSoap,
    sizes: [{ label: "75 gm", price: 80, mrp: 100 }],
  },

  // ---------------- NEW: NATURAL HONEY ----------------
  {
    id: 22,
    name: "Natural Tulsi Honey",
    slug: "natural-tulsi-honey",
    category: "Honey",
    price: "₹250",
    mrp: "₹300",
    image: tulsiHoney,
    sizes: [{ label: "250 gm", price: 250, mrp: 300 }],
  },
  {
    id: 23,
    name: "Forest Honey",
    slug: "forest-honey",
    category: "Honey",
    price: "₹230",
    mrp: "₹280",
    image: forestHoney,
    sizes: [{ label: "250 gm", price: 230, mrp: 280 }],
  },

  // ---------------- NEW: GHEE ----------------
  {
    id: 24,
    name: "Gir Cow Ghee",
    slug: "gir-cow-ghee",
    category: "Ghee",
    price: "₹525",
    mrp: "₹600",
    image: cowGhee,
    sizes: [
      { label: "250 ml", price: 525, mrp: 600 },
      { label: "500 ml", price: 999, mrp: 1200 },
      { label: "1 Ltr", price: 1999, mrp: 2400 },
    ],
  },
];