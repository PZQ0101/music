import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_SONG_DEL,
  SET_CURRENT_INDEX
} from './mutations-type'
export default {
  [SET_FULL_SCREEN] (state, flag) {
    state.isShowNomalPlayer = flag
  },
  [SET_MINI_PLAYER] (state, flag) {
    state.isShowMiniPlayer = flag
  },
  [SET_LIST_PLAYER] (state, flag) {
    state.isShowListPlayer = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODE_TYPE] (state, flag) {
    state.modeType = flag
  },
  [SET_SONG_DETAIL] (state, list) {
    state.songs = list
  },
  [SET_SONG_LYRIC] (state, lyric) {
    state.lyric = lyric
  },
  [SET_SONG_DEL] (state, index) {
    if (index !== undefined) {
      state.songs.splice(index, 1)
    } else {
      state.songs = []
    }
    if (state.songs.length === 0) {
      state.isShowMiniPlayer = false
      state.isShowNomalPlayer = false
    }
  },
  [SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  }
}
