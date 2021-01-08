//this function change elements order
export const swap = function (theArray, indexA, indexB) {
  const temp = theArray[indexA];
  theArray[indexA] = theArray[indexB];
  theArray[indexB] = temp;
};
