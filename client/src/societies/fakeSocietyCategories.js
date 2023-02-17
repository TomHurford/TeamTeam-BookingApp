export const categories = [
  { _id: "1", name: "Sport" },
  { _id: "2", name: "Academic" },
  { _id: "3", name: "Social" },
];

export function getCategories() {
  return categories.filter((c) => c);
}
