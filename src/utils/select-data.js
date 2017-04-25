export default (action, getState) => insight => {
  if (typeof insight === "function") {
    return insight(action, getState);
  } else {
    return insight;
  }
};
