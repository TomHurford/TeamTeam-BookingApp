import * as societiesAPI from "./fakeSocietyCategories";

const societies = [
  {
    id: "1",
    name: "Cricket",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 888,
    numberOfEvents: 2,
  },
  {
    id: "2",
    name: "Basketball",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 2,
    numberOfEvents: 1,
  },
  {
    id: "3",
    name: "Nerds",
    category: { id: "3", name: "Social" },
    numberOfFollowers: 9999,
    numberOfEvents: 42,
  },
  {
    id: "4",
    name: "AI",
    category: { id: "2", name: "Academic" },
    numberOfFollowers: 888,
    numberOfEvents: 2,
  },
  {
    id: "5",
    name: "Karate",
    category: { id: "1", name: "Sport" },
    numberOfFollowers: 222,
    numberOfEvents: 12,
  },
  {
    id: "6",
    name: "Movies",
    category: { id: "3", name: "Social" },
    numberOfFollowers: 9999,
    numberOfEvents: 42,
  },
];

export function getSocieties() {
  return societies;
}
