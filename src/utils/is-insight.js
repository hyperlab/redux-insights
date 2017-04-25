function isInsight(insight) {
  if (typeof insight !== "object") {
    return false;
  }

  if (typeof insight.type !== "string") {
    console.warn("Insight type is expected to be a string.");
    return false;
  }

  if (typeof insight.event !== "string") {
    console.warn("Insight event is expected to be a string.");
    return false;
  }

  if (typeof insight.data === "undefined") {
    console.warn("Insight data is expected to be defined");
    return false;
  }

  return true;
}

export default isInsight;
