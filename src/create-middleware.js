import createInsightHandler from "./create-insight-handler";
import toArray from "./utils/to-array";
import flattenArray from "./utils/flatten-array";
import isInsight from "./utils/is-insight";
import selectData from "./utils/select-data";

function createMiddleware(plugins, globalInsights = []) {
  const pluginsArray = toArray(plugins);
  const globalInsightsArray = toArray(globalInsights);

  const insightHandler = createInsightHandler(pluginsArray);
  const globalInsightsMap = globalInsightsArray.reduce(
    (insightsMap, preset) => ({
      ...insightsMap,
      ...preset
    }),
    {}
  );

  return store => next => action => {
    const globalInsights = toArray(globalInsightsMap[action.type])
      .map(selectData(action, store.getState))

    const insights = flattenArray([
      action.insights,
      globalInsights
    ])
      .filter(isInsight)
      .map(insightHandler);

    return Promise.all(insights).then(() => next(action));
  };
}

export default createMiddleware;
