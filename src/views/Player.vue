<template>
  <div class="player">
    <NomalPlayer
      :totalTime="totalTime"
      :currentTime="currentTime"
    ></NomalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
    <audio
      :src="this.currentSong.url"
      ref="audio"
      @timeupdate="timeupdate"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import NomalPlayer from '../components/Player/NomalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import { mapGetters, mapActions } from 'vuex'
import modeType from '../store/modeType'
export default {
  name: 'Player',
  components: {
    NomalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed: {
    ...mapGetters(['currentSong', 'isPlaying', 'currentIndex', 'curTime', 'modeType', 'songs', 'favoriteList', 'historyList'])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    currentIndex (newValue, oldValue) {
      /*
      注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
              https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
              在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
      解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
                ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      * */
      this.$refs.audio.ondurationchange = () => {
        this.totalTime = this.$refs.audio.duration
        if (this.isPlaying) {
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        } else {
          this.$refs.audio.pause()
        }
      }
    },
    curTime (newValue, oldValue) {
      this.currentTime = newValue
      this.$refs.audio.currentTime = newValue
    },
    favoriteList (newValue, oldValue) {
      window.localStorage.setItem('favoriteList', JSON.stringify(newValue))
    },
    historyList (newValue, oldValue) {
      window.localStorage.setItem('historyList', JSON.stringify(newValue))
    }
  },
  data: function () {
    return {
      totalTime: 0,
      currentTime: 0
    }
  },
  created () {
    const favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'))
    if (favoriteList === null) {
      return
    }
    this.setLocalFavoriteList(favoriteList)
    const historyList = JSON.parse(window.localStorage.getItem('historyList'))
    if (historyList === null) {
      return
    }
    this.setHistoryList(historyList)
  },
  mounted () {
    this.$refs.audio.ondurationchange = () => {
      this.totalTime = this.$refs.audio.duration
    }
  },
  methods: {
    ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setLocalFavoriteList',
      'setHistoryList',
      'setHistorySong'
    ]),
    timeupdate: function (e) {
      this.currentTime = e.target.currentTime
    },
    end () {
      if (this.modeType === modeType.loop) {
        this.setCurrentIndex(this.currentIndex + 1)
      } else if (this.modeType === modeType.one) {
        this.$refs.audio.play()
      } else if (this.modeType === modeType.random) {
        const index = this.getRandomIntInclusive(0, this.songs.length)
        this.setCurrentIndex(index)
      }
    },
    getRandomIntInclusive (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) // 含最大值，含最小值
    }
  }
}
</script>

<style lang="scss" scoped></style>
