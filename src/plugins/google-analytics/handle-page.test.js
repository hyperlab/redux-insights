import handlePage from "./handle-page";

describe("handlePage", () => {
  const tracker = {
    set: jest.fn(),
    send: jest.fn()
  };

  beforeEach(() => {
    tracker.set.mockReset();
    tracker.send.mockReset();
  });

  it("should set page url on tracker and send a pageview event", () => {
    const insight = {
      data: "/www"
    };

    handlePage(tracker, insight);

    expect(tracker.set).toHaveBeenCalled();
    expect(tracker.set).toHaveBeenCalledWith("page", insight.data);

    expect(tracker.send).toHaveBeenCalled();
    expect(tracker.send).toHaveBeenCalledWith("pageview");
  });
});
