function handlePage(tracker, { data }) {
  tracker.set("page", data);
  tracker.send("pageview");
}

export default handlePage;
