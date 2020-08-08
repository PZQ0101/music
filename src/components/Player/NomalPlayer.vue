<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
    <div class="nomal-player" v-show="this.isShowNomalPlayer">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime='currentTime'></PlayerMiddle>
        <PlayerBottom :totalTime='totalTime' :currentTime='currentTime'></PlayerBottom>
      </div>
      <div class="player-bg">
        <img
          :src="this.currentSong.picUrl"
          alt=""
        />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NomalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters(['isShowNomalPlayer', 'currentSong'])
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
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
.nomal-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .player-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(5px);
    }
  }
}
</style>
