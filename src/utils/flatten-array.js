function flattenArray(arr = []) {
  if (!Array.isArray(arr)) {
    throw new Error("flattenArray only works on arrays");
  }

  return arr.reduce(
    (res, el) =>
      (Array.isArray(el) ? res.concat(flattenArray(el)) : res.concat(el)),
    []
  );
}

export default flattenArray;
