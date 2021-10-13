export const snakeToTitleCase = (str = "") => {
  return str.split("_").map(titleCase).join(" ");
};
