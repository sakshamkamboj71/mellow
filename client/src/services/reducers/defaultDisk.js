const initialState = {
  logo: "https://firebasestorage.googleapis.com/v0/b/mercado-place.appspot.com/o/finalDisk.png?alt=media&token=f865d634-ebcf-4666-b44e-83cb446adb56",
  icon: "https://firebasestorage.googleapis.com/v0/b/mercado-place.appspot.com/o/finalLogo.jpg?alt=media&token=10396be1-aa04-459b-8a59-215e4e7fa5da",
};

const getDefaultDisk = (state = initialState, action) => {
  switch (action.type) {
    case "DEFAULT_DISK":
      return state.logo;

    case "DEFAULT_MUSIC":
      return state.icon;

    default:
      return state;
  }
};

export default getDefaultDisk;
