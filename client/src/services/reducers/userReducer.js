const initialState = {};

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_INFO":
      return state;

    case "CHANGE_USER_INFO":
      return (state = action.data);

    default:
      return state;
  }
};

export default userInfo;
