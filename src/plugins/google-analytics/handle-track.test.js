import handleTrack from "./handle-track";

describe("handleTrack", () => {
  it("should send an event", () => {
    const tracker = {
      send: jest.fn()
    };

    const insight = {
      event: "testing"
    };

    handleTrack(tracker, insight);

    expect(tracker.send).toHaveBeenCalled();
    expect(tracker.send).toHaveBeenCalledWith(
      "event",
      "insights",
      insight.event
    );
  });
});
