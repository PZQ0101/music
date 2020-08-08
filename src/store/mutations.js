import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_SONG_DEL,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_LIST,
  SET_LOCALFAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
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
  },
  [SET_CURRENT_TIME] (state, time) {
    state.curTime = time
  },
  [SET_FAVORITE_LIST] (state, song) {
    const result = state.favoriteList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      state.favoriteList.unshift(song)
    } else {
      state.favoriteList.forEach(function (value, index) {
        if (result === value) {
          state.favoriteList.splice(index, 1)
        }
      })
    }
  },
  [SET_LOCALFAVORITE_LIST] (state, list) {
    state.favoriteList = list
  },
  [SET_HISTORY_SONG] (state, song) {
    const result = state.historyList.find(function (currentValue) {
      return currentValue.id === song.id
    })
    if (result === undefined) {
      state.historyList.unshift(song)
    } else {
      state.historyList.forEach(function (value, index) {
        if (result === value) {
          state.historyList.splice(index, 1)
        }
      })
      state.historyList.unshift(song)
    }
    if (state.historyList.length > 30) {
      state.historyList.pop()
    }
  },
  [SET_HISTORY_LIST] (state, list) {
    state.historyList = list
  }
}
