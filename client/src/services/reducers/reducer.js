const initialState = false;
const toggleLongSidebar = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return !state;

    default:
      return state;
  }
};

export default toggleLongSidebar;
