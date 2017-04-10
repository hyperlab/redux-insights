import { page } from "../insight-factories";

// This should be imported from react-router-redux package. However, it's a very
// heavy dependency, and the current released version doesn't provide an ES6
// version, so that's why we do it this hardcoded way.
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default {
  [LOCATION_CHANGE]: page("change")
};
