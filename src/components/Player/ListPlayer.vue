<template>
  <transition
    :css="false"
    @enter="enter"
    @leave="leave">
  <div class="list-player" v-show="isShow">
    <div class="player-top">
      <div class="left">
        <div class="mode"></div>
        <p>顺序播放</p>
      </div>
      <div class="right">
        <div class="del"></div>
      </div>
    </div>
    <div class="player-middle">
      <ScrollView>
        <ul>
          <li class="item">
            <div class="left">
              <div class="play" @click="changePlaying" ref="play"></div>
              <p>苦瓜</p>
            </div>
            <div class="right">
              <div class="favorite"></div>
              <div class="close"></div>
            </div>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="player-bottom" @click="hidden">
      关闭
    </div>
  </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ScrollView from '../ScrollView'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'ListPlayer',
  data: function () {
    return {
      isShow: false
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying'
    ]),
    show () {
      this.isShow = true
    },
    hidden () {
      this.isShow = false
    },
    enter (el, done) {
      Velocity(el, 'transition.bounceUpIn', { duration: 500 }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
        done()
      })
    },
    changePlaying () {
      this.setIsPlaying(!this.isPlaying)
    }
  },
  components: {
    ScrollView
  },
  computed: {
    ...mapGetters([
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
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include bg_sub_color();
  .player-top {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .mode {
        width: 56px;
        height: 56px;
        margin: 0 20px;
        @include bg_img('../../assets/images/small_loop');
      }
      p {
        @include font_color();
        @include font_size($font_medium);
      }
    }
    .right {
      .del {
        width: 86px;
        height: 86px;
        @include bg_img('../../assets/images/small_del');
      }
    }
  }
  .player-middle {
    width: 100%;
    ul {
      li {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .play {
            width: 56px;
            height: 56px;
            margin: 0 20px;
            @include bg_img('../../assets/images/small_pause');
            &.active {
              @include bg_img('../../assets/images/small_play');
            }
          }
          p {
            @include font_color();
            @include font_size($font_medium);
          }
        }
        .right {
          display: flex;
          // justify-content: space-between;
          align-items: center;
          .favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_favorite');
          }
          .close {
            width: 56px;
            height: 56px;
            margin: 0 20px;
            @include bg_img('../../assets/images/small_close');
          }
        }
      }
    }
  }
  .player-bottom {
    width: 100%;
    height: 100px;
    text-align: center;
    border-top: 1px solid #ccc;
    line-height: 100px;
    color: #fff;
    @include font_size($font_medium);
    @include bg_color();
  }
}
</style>
