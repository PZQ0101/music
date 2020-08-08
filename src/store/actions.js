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
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'
import { parseLyric } from '../tools/tools'
export default {
  setFullScreen ({
    commit
  }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer ({
    commit
  }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({
    commit
  }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying ({
    commit
  }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({
    commit
  }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongDetail  ({ commit }, ids) {
    const result = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongUrl({ id: ids.join(',') })
    // console.log(urls)
    // console.log(result)
    const list = []
    result.data.songs.forEach(function (value, i) {
      const obj = {}
      // obj.url = urls.data[i].url
      for (let j = 0; j < urls.data.data.length; j++) {
        const item = urls.data.data[j]
        if (value.id === item.id) {
          obj.url = item.url
          break
        }
      }
      obj.id = value.id
      obj.name = value.name
      let singer = ''
      value.ar.forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '-' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value.al.picUrl
      list.push(obj)
    })
    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric ({ commit }, id) {
    const result = await getSongLyric({ id: id })
    console.log(result.data.lrc.lyric)
    const obj = parseLyric(result.data.lrc.lyric)
    commit(SET_SONG_LYRIC, obj)
  },
  setSongDel ({
    commit
  }, index) {
    commit(SET_SONG_DEL, index)
  },
  setCurrentIndex ({
    commit
  }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({
    commit
  }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteList ({
    commit
  }, song) {
    commit(SET_FAVORITE_LIST, song)
  },
  setLocalFavoriteList ({
    commit
  }, list) {
    commit(SET_LOCALFAVORITE_LIST, list)
  },
  setHistorySong ({
    commit
  }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({
    commit
  }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}
