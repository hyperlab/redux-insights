function withInsights(insights) {
  return function(factory) {
    return function(...args) {
      return {
        ...factory(...args),
        insights
      };
    };
  };
}

export default withInsights;
