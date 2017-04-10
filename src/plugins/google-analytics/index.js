import handleInsight from "./handle-insight";
import init from "./init";

function createGoogleAnalyticsPlugin(options) {
  const { trackingID } = options;
  const promise = init(trackingID);
  return insight => promise.then(tracker => handleInsight(tracker, insight));
}

export default createGoogleAnalyticsPlugin;
