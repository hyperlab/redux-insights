function createInsightHandler(plugins) {
  return function handleInsight(insight) {
    return plugins.reduce(
      (promise, plugin) => promise.then(data => plugin(data)),
      Promise.resolve(insight)
    );
  };
}

export default createInsightHandler;
