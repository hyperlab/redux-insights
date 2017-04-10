function handleIdentify(tracker, { data }) {
  tracker.set("userId", data);
}

export default handleIdentify;
