import { INSIGHT_IDENTIFY, INSIGHT_PAGE, INSIGHT_TRACK } from "./types";

export const id = x => x;

export const createInsightFactory = type => (event, selector = id) => {
  if (typeof selector !== "function") {
    throw new Error("Expected selector to be a function.");
  }

  return { type, event, selector };
};

export const identify = createInsightFactory(INSIGHT_IDENTIFY);
export const page = createInsightFactory(INSIGHT_PAGE);
export const track = createInsightFactory(INSIGHT_TRACK);
