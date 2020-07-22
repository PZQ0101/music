<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progerss-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode loop" @click="changeMode" ref="mode"></div>
      <div class="prev"></div>
      <div class="play" @click="changePlaying" ref="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modeType from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions(['setIsPlaying', 'setModeType']),
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
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType'])
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
      margin: 0 10px;
      height: 10px;
      width: 100%;
      background: #fff;
      position: relative;
      .progress-line {
        width: 50%;
        height: 100%;
        background: #ccc;
        display: flex;
        align-items: center;
        .progerss-dot {
          position: absolute;
          left: 50%;
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
    }
  }
}
</style>
