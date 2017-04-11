function handleTrack(tracker, { event }) {
  tracker.send("event", "insights", event);
}

export default handleTrack;
