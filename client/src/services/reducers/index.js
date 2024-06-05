import getDefaultDisk from "./defaultDisk";
import toggleLongSidebar from "./reducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  toggleLongSidebar,
  getDefaultDisk,
});

export default rootReducer;
