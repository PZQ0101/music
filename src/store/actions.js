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
import { getSongDetail, getSongLyric, getSongUrl } from '../api/index'
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
  }
}

// 格式化歌词方法
function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  const reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  const reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  // eslint-disable-next-line no-useless-escape
  const reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  const lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    const minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    const secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    const time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    const text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
