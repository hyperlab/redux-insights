import {
  INSIGHT_GA_TRACK,
  INSIGHT_GA_PAGE,
  INSIGHT_GA_IDENTIFY
} from "./types";
import { INSIGHT_TRACK, INSIGHT_PAGE, INSIGHT_IDENTIFY } from "../../types";
import handleTrack from "./handle-track";
import handlePage from "./handle-page";
import handleIdentify from "./handle-identify";

function handleInsight(tracker, insight) {
  switch (insight.type) {
    case INSIGHT_GA_TRACK:
    case INSIGHT_TRACK:
      handleTrack(tracker, insight);
      break;

    case INSIGHT_GA_PAGE:
    case INSIGHT_PAGE:
      handlePage(tracker, insight);
      break;

    case INSIGHT_GA_IDENTIFY:
    case INSIGHT_IDENTIFY:
      handleIdentify(tracker, insight);
      break;
  }

  return insight;
}

export default handleInsight;
