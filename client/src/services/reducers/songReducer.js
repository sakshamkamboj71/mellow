const initialState = {
  folderPlaying: null,
  songPlaying: null,
};

const songInfo = (state = initialState, action) => {
  switch (action.type) {
    case "SONG_PLAYING":
      return state.songPlaying;

    case "CHANGE_SONG":
      return {
        ...state,
        songPlaying: action.data,
      };

    case "CHANGE_FOLDER":
      return {
        ...state,
        folderPlaying: action.data,
      };

    default:
      return state;
  }
};

export default songInfo;
