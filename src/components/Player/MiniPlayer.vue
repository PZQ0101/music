<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
  <div class="mini-player" v-show="this.isShowMiniPlayer">
    <div class="player-left" @click="showNomalPlayer">
      <div class="player-logo">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=250474341,339329520&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <div class="player-title">
        <h3>苦瓜</h3>
        <p>陈奕迅</p>
      </div>
    </div>
    <div class="player-right">
      <div class="play" @click="changePlaying" ref="play"></div>
      <div class="list" @click="showListPlayer"></div>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlayer',
  methods: {
    showListPlayer () {
      this.$emit('show')
    },
    ...mapActions([
      'setFullScreen', // 将 `this.setFullScreen()` 映射为 `this.$store.dispatch('setFullScreen')`
      'setMiniPlayer',
      'setIsPlaying'
    ]),
    showNomalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    },
    changePlaying () {
      this.setIsPlaying(!this.isPlaying)
    },
    enter (el, done) {
      Velocity(el, { opacity: 1 }, { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying'
    ])
  },
  watch: {
    isPlaying (newvalue, oldvalue) {
      if (newvalue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 120px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .player-left {
    height: 100%;
    display: flex;
    align-items: center;
    .player-logo {
      width: 100px;
      height: 100px;
      margin: 0 30px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .player-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @include font_color();
      h3 {
        @include font_size($font_medium);
      }
      p {
        @include font_size($font_medium_s);
      }
    }
  }
  .player-right {
    display: flex;
    align-items: center;
    .play {
      width: 84px;
      height: 84px;
      @include bg_img('../../assets/images/play');
      &.active {
        @include bg_img('../../assets/images/pause');
      }
    }
    .list {
      width: 120px;
      height: 120px;
      @include bg_img('../../assets/images/list');
    }
  }
}
</style>
