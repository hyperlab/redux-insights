import { INSIGHT_IDENTIFY, INSIGHT_PAGE, INSIGHT_TRACK } from "./types";

export const createInsightFactory = type => (event, data = null) => ({
  type,
  event,
  data
});

export const identify = createInsightFactory(INSIGHT_IDENTIFY);
export const page = createInsightFactory(INSIGHT_PAGE);
export const track = createInsightFactory(INSIGHT_TRACK);
