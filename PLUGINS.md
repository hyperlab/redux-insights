# Plugin API
redux-insights offer a simple but powerful API to allow you to write custom
plugins that work together with insights. By default, we ship a Google Analytics
plugin.

## Basic concept
The plugins you provide to redux-insights are chained. This means that the
return value of one plugin is used as input to the next plugin, like this:

```javascript
const plugins = [googleAnalytics, logInsight, doSomethingElse];

googleAnalytics(insight)
  .then(resultFromGA => logInsight(resultFromGA))
  .then(resultFromLogger => doSomethingElse(resultFromLogger))
  // ...
```

This means that you can use a plugin to transform, attach more data or do
anything to an insight before it's passed to the next plugin. If you want to run
asynchronous code you can return a promise that resolves to the data you want,
otherwise just return the data.

## API
A plugin is a pure function that takes an insight, does some kind of side effect
or calculation and then returns the insight, or an enhanced version of it.

This is a simple example of a plugin that outputs the insight using `console.log`
and then passes the insight on.

```javascript
function insightLogger(insight) {
  console.log('RECEIVED INSIGHT:', insight);
  return insight;
}
```

### Insight shape
An insight is a plain object, preferably created using one of the factory
functions `track`, `page` or `identify`. It has the following shape:

```javascript
{
  type: INSIGHT_TRACK,
  event: 'create',
  data: 'some data'
}
```

Out of the box we support the types `INSIGHT_TRACK`, `INSIGHT_PAGE` and
`INSIGHT_IDENTIFY`, but you can handle any insight type you'd like in your
plugin. For example, the Google Analytics plugin also handles `INSIGHT_GA_TRACK`,
`INSIGHT_GA_PAGE` and `INSIGHT_GA_IDENTIFY`. The insight type has to be a
string.

### Best practices
- For unknown insight types, or types you don't want to handle, just return the
insight.
- When you want to enhance an insight, make sure you return a new object rather
than mutating the original.
- If your plugin is not for enhancing insights, make sure you return the
original insight to allow plugin chaining.
- To pass options to your plugin, create a plugin factory that takes an option
object and returns a plugin function. See Google Analytics plugin for example.
