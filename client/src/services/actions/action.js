export const toggleSidebar = () => {
  return {
    type: "TOGGLE_SIDEBAR",
  };
};

export const defaultDisk = () => {
  return {
    type: "DEFAULT_DISK",
  };
};

export const defaultMusic = () => {
  return {
    type: "DEFAULT_MUSIC",
  };
};

export const songPlaying = () => {
  return {
    type: "SONG_PLAYING",
  };
};

export const changeSong = (data) => {
  return {
    type: "CHANGE_SONG",
    data: data,
  };
};

export const changeFolder = (data) => {
  return {
    type: "CHANGE_FOLDER",
    data: data,
  };
};

export const getUserInfo = () => {
  return {
    type: "GET_USER_INFO",
  };
};

export const changeUserInfo = (data) => {
  return {
    type: "CHANGE_USER_INFO",
    data: data,
  };
};
