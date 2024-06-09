import getDefaultDisk from "./defaultDisk";
import toggleLongSidebar from "./reducer";

import { combineReducers } from "redux";
import songInfo from "./songReducer";
import userInfo from "./userReducer";

const rootReducer = combineReducers({
  toggleLongSidebar,
  getDefaultDisk,
  songInfo,
  userInfo,
});

export default rootReducer;
