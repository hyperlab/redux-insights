function handleTrack(tracker, { event }) {
  tracker.send("event", "", event);
}

export default handleTrack;
