export const doesArrayHaveDuplicates = array => {
  return array.length !== new Set(array).size;
};
