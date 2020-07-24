export default {
  isShowNomalPlayer (state) {
    return state.isShowNomalPlayer
  },
  isShowMiniPlayer (state) {
    return state.isShowMiniPlayer
  },
  isShowListPlayer (state) {
    return state.isShowListPlayer
  },
  isPlaying (state) {
    return state.isPlaying
  },
  modeType (state) {
    return state.modeType
  },
  songs (state) {
    return state.songs
  },
  currentSong (state) {
    let obj = {
      id: null,
      name: '',
      singers: '',
      picUrl: null,
      url: ''
    }
    if (state.songs.length !== 0) {
      obj = state.songs[state.currentIndex]
    }
    return obj
  },
  currentIndex (state) {
    return state.currentIndex
  },
  lyric (state) {
    return state.lyric
  }
}
