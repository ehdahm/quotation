export const getIdFromName = (
  objectVariable,
  name: string
): string | undefined => {
  const obj = objectVariable.find((scope) => scope.name === name);
  return obj?._id;
};
// eg. getIdFromName(scopeOfWorks, 'Carpentry');
// retuurns the matching id
