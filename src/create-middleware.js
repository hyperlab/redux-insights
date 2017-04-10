import createInsightHandler from "./create-insight-handler";
import flattenArray from "./utils/flatten-array";
import isInsight from "./utils/is-insight";

function createMiddleware(plugins, globalInsights = {}) {
  const insightHandler = createInsightHandler(plugins);

  return store =>
    next =>
      action => {
        const insights = flattenArray([
          action.insights,
          globalInsights[action.type]
        ])
          .filter(isInsight)
          .map(({ type, event, selector }) =>
            insightHandler({
              type,
              event,
              data: selector(action, store.getState)
            })
          );

        return Promise.all(insights).then(() => next(action));
      };
}

export default createMiddleware;
