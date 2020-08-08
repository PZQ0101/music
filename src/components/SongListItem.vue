<template>
  <ul class="song-list">
    <li
      class="item"
      v-for="value in songs"
      :key="value.id"
      @click="showNomalPlayer(value.id)"
    >
      <img v-lazy="value.picUrl" alt="" />
      <div class="song-msg">
        <p>{{ value.name }}</p>
        <p>{{ value.singer }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongListItem',
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
      'setMiniPlayer',
      'setSongDetail'
    ]),
    showNomalPlayer (id) {
      this.setFullScreen(true)
      this.setMiniPlayer(false)
      this.setSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
@import '../assets/css/variable';
.song-list {
  @include bg_sub_color();
  @include font_color();
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
</style>
