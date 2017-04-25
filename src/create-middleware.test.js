import configureStore from "redux-mock-store";

import createMiddleware from "./create-middleware";
import { track, page } from "./insight-factories";
import { INSIGHT_TRACK, INSIGHT_PAGE } from "./types";

describe("createMiddleware", () => {
  const mockPlugin = jest.fn();
  const mockNext = jest.fn();
  const mockStore = configureStore([])({});

  const baseAction = {
    type: "myAction",
    payload: "myData"
  };

  beforeEach(() => {
    mockPlugin.mockReset();
    mockNext.mockReset();
  });

  it("should not call plugin if no insight handlers are provided", () => {
    const middleware = createMiddleware([mockPlugin]);
    return middleware(mockStore)(mockNext)(baseAction).then(() => {
      expect(mockPlugin).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should not call plugin if no insight handlers did match", () => {
    const insightMap = {
      testAction: track("testAction")
    };

    const middleware = createMiddleware([mockPlugin], insightMap);
    return middleware(mockStore)(mockNext)(baseAction).then(() => {
      expect(mockPlugin).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should call plugin if action has an insight handler", () => {
    const data = "mockData";
    const action = {
      ...baseAction,
      insights: track(baseAction.type, data)
    };

    const middleware = createMiddleware([mockPlugin]);
    return middleware(mockStore)(mockNext)(action).then(() => {
      expect(mockPlugin).toHaveBeenCalledTimes(1);
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_TRACK,
        event: baseAction.type,
        data
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should call plugin twice if action has two insights attached", () => {
    const action = {
      ...baseAction,
      insights: [track(baseAction.type), page(baseAction.type)]
    };

    const middleware = createMiddleware([mockPlugin]);
    return middleware(mockStore)(mockNext)(action).then(() => {
      expect(mockPlugin).toHaveBeenCalledTimes(2);
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_TRACK,
        event: baseAction.type,
        data: null
      });
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_PAGE,
        event: baseAction.type,
        data: null
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should trigger insight if insight map had matching handler", () => {
    const insightMap = {
      [baseAction.type]: track(baseAction.type)
    };

    const middleware = createMiddleware([mockPlugin], insightMap);
    return middleware(mockStore)(mockNext)(baseAction).then(() => {
      expect(mockPlugin).toHaveBeenCalledTimes(1);
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_TRACK,
        event: baseAction.type,
        data: null
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should trigger analytics twice if insight map has two insights in matching handler", () => {
    const insightMap = {
      [baseAction.type]: [track(baseAction.type), page(baseAction.type)]
    };

    const middleware = createMiddleware([mockPlugin], insightMap);
    return middleware(mockStore)(mockNext)(baseAction).then(() => {
      expect(mockPlugin).toHaveBeenCalledTimes(2);
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_TRACK,
        event: baseAction.type,
        data: null
      });
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_PAGE,
        event: baseAction.type,
        data: null
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it("should trigger analytics twice if action has one insight and map has another one", () => {
    const data = "pageData";
    const insightMap = {
      [baseAction.type]: page(baseAction.type, data)
    };
    const action = {
      ...baseAction,
      insights: track(baseAction.type)
    };

    const middleware = createMiddleware([mockPlugin], insightMap);
    return middleware(mockStore)(mockNext)(action).then(() => {
      expect(mockPlugin).toHaveBeenCalledTimes(2);
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_TRACK,
        event: action.type,
        data: null
      });
      expect(mockPlugin).toHaveBeenCalledWith({
        type: INSIGHT_PAGE,
        event: action.type,
        data
      });
      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  it();
});
