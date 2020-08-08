<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="this.isShowListPlayer">
      <div class="player-top">
        <div class="left">
          <div class="mode loop" @click="changeMode" ref="mode"></div>
          <p v-if="this.modeType === 0">顺序播放</p>
          <p v-else-if="this.modeType === 1">单曲播放</p>
          <p v-else>随机播放</p>
        </div>
        <div class="right">
          <div class="del" @click="delAll"></div>
        </div>
      </div>
      <div class="player-middle">
        <ScrollView ref="scrollView">
          <ul ref="play">
            <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
              <div class="left">
                <div class="play" @click="changePlaying" v-show="index === currentIndex"></div>
                <p>{{ value.name }}</p>
              </div>
              <div class="right">
                <div class="favorite" @click.stop='favorite(value)' :class="{'active': isFavorite(value)}"></div>
                <div class="close" @click.stop="del(index)"></div>
              </div>
            </li>
          </ul>
        </ScrollView>
      </div>
      <div class="player-bottom" @click="hiddenListPlayer">
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
import modeType from '../../store/modeType'
export default {
  name: 'ListPlayer',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setSongDel',
      'setCurrentIndex',
      'setFavoriteList'
    ]),
    hiddenListPlayer () {
      this.setListPlayer(false)
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
    del (index) {
      if (this.currentIndex > index) {
        this.setSongDel(index)
        this.setCurrentIndex(this.currentIndex - 1)
      } else {
        this.setSongDel(index)
      }
    },
    delAll () {
      this.setSongDel()
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
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
  components: {
    ScrollView
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'isShowListPlayer', 'songs', 'currentIndex', 'favoriteList'])
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
    isShowListPlayer (newValue, oldValue) {
      if (newValue) {
        this.$refs.scrollView.refresh()
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
        &.loop {
          @include bg_img('../../assets/images/small_loop');
        }
        &.one {
          @include bg_img('../../assets/images/small_one');
        }
        &.random {
          @include bg_img('../../assets/images/small_shuffle');
        }
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
    height: 700px;
    overflow: hidden;
    ul {
      &.active {
        li {
          .left {
            .play {
              @include bg_img('../../assets/images/small_pause');
            }
          }
        }
      }
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
            @include bg_img('../../assets/images/small_play');
          }
          p {
            width: 300px;
            @include no_wrap();
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
            @include bg_img('../../assets/images/small_un_favorite');
            &.active {
              @include bg_img('../../assets/images/small_favorite');
            }
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
