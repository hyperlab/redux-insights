import selectData from "./utils/select-data";

function withInsights(insights) {
  return function(factory) {
    return function(...args) {
      const action = factory(...args);

      return {
        ...action,
        insights: selectData(action)(insights)
      };
    };
  };
}

export default withInsights;
