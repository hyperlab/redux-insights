import createInsightHandler from "./create-insight-handler";

describe("createInsightHandler", () => {
  it("should return a function", () => {
    expect(typeof createInsightHandler([])).toBe("function");
  });

  it("should work through all the functions", () => {
    const mock1 = jest.fn().mockReturnValue("insight2");
    const mock2 = jest.fn();
    const plugins = [mock1, mock2];

    createInsightHandler(plugins)("insight").then(() => {
      expect(mock1).toHaveBeenCalled();
      expect(mock1).toHaveBeenCalledWith("insight");
      expect(mock2).toHaveBeenCalled();
      expect(mock2).toHaveBeenCalledWith("insight2");
    });
  });
});
