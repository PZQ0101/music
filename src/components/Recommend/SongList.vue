<template>
  <div class="song">
    <div class="song-title">最新音乐</div>
    <ul class="song-list">
      <li class="item" v-for="value in songs" :key="value.id" @click="showNomalPlayer">
        <!-- <img :src="value.picUrl" alt=""> -->
        <img v-lazy="value.picUrl" alt="" />
        <div class="song-msg">
          <p>{{ value.name }}</p>
          <p>{{ value.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen', // 将 `this.setFullScreen()` 映射为 `this.$store.dispatch('setFullScreen')`
      'setMiniPlayer'
    ]),
    showNomalPlayer () {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.song {
  @include bg_sub_color();
  @include font_color();
  .song-title {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
  }
  .song-list {
    .item {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      img {
        width: 100px;
        height: 100px;
        border-radius: 10px;
        margin: 20px;
      }
      .song-msg {
        p {
          &:nth-of-type(1) {
            @include font-size($font_large);
            margin-bottom: 10px;
          }
          &:nth-of-type(2) {
            @include font-size($font_samll);
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>
