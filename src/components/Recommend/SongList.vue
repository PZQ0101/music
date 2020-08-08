<template>
  <div class="song">
    <div class="song-title">最新音乐</div>
    <SongListItem :songs='songs'></SongListItem>
  </div>
</template>

<script>
import SongListItem from '../SongListItem'
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    SongListItem
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.song {
  .song-title {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
    @include font_color();
  }
}
</style>
