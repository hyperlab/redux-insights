import createInsightHandler from "./create-insight-handler";
import toArray from "./utils/to-array";
import flattenArray from "./utils/flatten-array";
import isInsight from "./utils/is-insight";

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

  return store =>
    next =>
      action => {
        const insights = flattenArray([
          action.insights,
          globalInsightsMap[action.type]
        ])
          .filter(isInsight)
          .map(({ type, event, selector }) =>
            insightHandler({
              type,
              event,
              data: selector(action, store.getState)
            }));

        return Promise.all(insights).then(() => next(action));
      };
}

export default createMiddleware;
