import * as societiesAPI from "./fakeSocietyCategories";

const societies = [
  {
    id: "1",
    name: "Cricket",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 888,
    numberOfEvents: 2,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "2",
    name: "Basketball",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 2,
    numberOfEvents: 1,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "3",
    name: "Nerds",
    category: { id: "3", name: "Social" },
    numberOfFollowers: 9999,
    numberOfEvents: 42,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "4",
    name: "AI",
    category: { id: "2", name: "Academic" },
    numberOfFollowers: 888,
    numberOfEvents: 2,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "5",
    name: "Karate",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 222,
    numberOfEvents: 12,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "6",
    name: "Movies",
    category: { id: "3", name: "Social" },
    numberOfFollowers: 9999,
    numberOfEvents: 42,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },

  {
    id: "7",
    name: "Philosophy",
    category: { id: "2", name: "Academic" },
    numberOfFollowers: 23,
    numberOfEvents: 2,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },

  {
    id: "8",
    name: "Medicine",
    category: { id: "2", name: "Academic" },
    numberOfFollowers: 223,
    numberOfEvents: 8,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "9",
    name: "Football",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 21,
    numberOfEvents: 11,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
  {
    id: "10",
    name: "Muay Thai",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 9,
    numberOfEvents: 1,
    socialLinks: { instagram: "", facebook: "", twitter: "", website: "" },
    imageLinks: { logo: "", banner: "" },
    committeeMembers: [],
  },
];

export function getSocieties() {
  return societies;
}

export function getSociety(id) {
  return societies.find((s) => s.id === id);
}
