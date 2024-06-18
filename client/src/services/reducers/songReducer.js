const initialState = {
  folderPlaying: null,
  songPlaying: null,
  singleSong: null,
};

const songInfo = (state = initialState, action) => {
  switch (action.type) {
    case "SONG_PLAYING":
      return state.songPlaying;
    case "GET_SINGLE_SONG":
      return state.singleSong;

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
    case "CHANGE_SINGLE_SONG":
      return {
        ...state,
        singleSong: action.data,
      };

    default:
      return state;
  }
};

export default songInfo;
