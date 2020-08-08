<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="eleCurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick">
        <div class="progress-line" ref="progressLine">
          <div class="progerss-dot"></div>
        </div>
      </div>
      <span ref="eleTotalTime">00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="changeMode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="changePlaying" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click='favorite(currentSong)' :class="{'active': isFavorite(currentSong)}"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType', 'setCurrentIndex', 'setCurrentTime', 'setFavoriteList']),
    changePlaying () {
      this.setIsPlaying(!this.isPlaying)
    },
    changeMode () {
      if (this.modeType === modeType.loop) {
        this.setModeType(modeType.one)
      } else if (this.modeType === modeType.one) {
        this.setModeType(modeType.random)
      } else {
        this.setModeType(modeType.loop)
      }
    },
    prev () {
      if (this.currentIndex === 0) {
        this.setCurrentIndex(this.songs.length - 1)
      } else {
        this.setCurrentIndex(this.currentIndex - 1)
      }
    },
    next () {
      if (this.currentIndex === this.songs.length - 1) {
        this.setCurrentIndex(0)
      } else {
        this.setCurrentIndex(this.currentIndex + 1)
      }
    },
    formateTime (time) {
      let seconds = parseInt(time % 60)
      let minutes = parseInt(time / 60)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return {
        seconds: seconds,
        minutes: minutes
      }
    },
    progressClick (e) {
      const nomalLeft = e.target.offsetLeft
      const eventLeft = e.pageX
      const clickLeft = eventLeft - nomalLeft
      const progressWidth = e.target.offsetWidth
      const value = clickLeft / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      this.setCurrentTime(this.totalTime * value)
    },
    favorite (song) {
      this.setFavoriteList(song)
    },
    isFavorite (song) {
      const result = this.favoriteList.find(function (value) {
        return value.id === song.id
      })
      return result !== undefined
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'currentIndex', 'songs', 'currentSong', 'favoriteList'])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === modeType.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === modeType.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    currentTime (newValue, oldValue) {
      // 1.格式化currentTime
      const time = this.formateTime(newValue)
      this.$refs.eleCurrentTime.innerHTML = time.minutes + ':' + time.seconds
      // 2.设置时间进度条
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    },
    totalTime () {
      const time = this.formateTime(this.totalTime)
      this.$refs.eleTotalTime.innerHTML = time.minutes + ':' + time.seconds
    }
  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    @include font_color();
    .progress-bar {
      margin: 0 15px;
      height: 10px;
      width: 100%;
      background: #fff;
      .progress-line {
        width: 0%;
        height: 100%;
        background: #ccc;
        display: flex;
        align-items: center;
        position: relative;
        .progerss-dot {
          position: absolute;
          left: 100%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
        }
      }
    }
  }
  .bottom-controll {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 80%;
    padding: 50px 0;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      &.loop {
        @include bg_img('../../assets/images/loop');
      }
      &.one {
        @include bg_img('../../assets/images/one');
      }
      &.random {
        @include bg_img('../../assets/images/shuffle');
      }
    }
    .prev {
      @include bg_img('../../assets/images/prev');
    }
    .play {
      @include bg_img('../../assets/images/play');
      &.active {
        @include bg_img('../../assets/images/pause');
      }
    }
    .next {
      @include bg_img('../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../assets/images/un_favorite');
      &.active {
        @include bg_img('../../assets/images/favorite');
      }
    }
  }
}
</style>
