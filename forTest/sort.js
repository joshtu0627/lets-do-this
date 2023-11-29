const skillList = [
  "Design",
  "Finance",
  "Marketing",
  "Management",
  "Programming",
  "Sales",
  "Writing",
  "Law",
  "Language",
  "Data Analysis",
  "Education",
  "Medical",
  "Music",
  "Photography",
  "Video Production",
  "Electrical Engineering",
];

const sortList = (list) => {
  const newList = list.sort((a, b) => {
    return a.localeCompare(b);
  });
  return newList;
};

console.log(sortList(skillList));
