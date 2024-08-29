export const getIdFromName = (
  objectVariable,
  name: string
): string | undefined => {
  const obj = objectVariable.find((scope) => scope.name === name);
  return obj?._id;
};

// eg. getIdFromName(scopeOfWorks, 'Carpentry');
// retuurns the matching id

export const getNameFromId = (
  objectVariable,
  id: string
): string | undefined => {
  const obj = objectVariable.find((item) => item._id === id);
  console.log("obj", obj);
  return obj.name;
};

// eg. getNameFromId(scopeOfWorks, '1236127631723612');
// retuurns the matching name
