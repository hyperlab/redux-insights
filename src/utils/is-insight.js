function isInsight(insight) {
  if (typeof insight !== 'object') {
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

  if (typeof insight.selector !== "function") {
    console.warn("Insight selector is expected to be a function");
    return false;
  }

  return true;
}

export default isInsight;
