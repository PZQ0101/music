<template>
  <ul class="detail-bottom">
    <li class="bottom-top">
      <span class="bottom-icon"></span>
      <p class="bottom-title">播放全部</p>
    </li>
    <li v-for="value in playlist" :key="value.id" @click.stop="showNomalPlayer">
      <h3>{{ value.name }}</h3>
      <p>{{ value.al.name }} - {{ value.ar[0].name }}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
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
.detail-bottom {
  width: 100%;
  @include font-color();
  li {
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
    h3 {
      @include font-size($font_medium);
      padding-bottom: 5px;
    }
    p {
      @include font-size($font_samll);
      opacity: 0.6;
    }
  }
  .bottom-top {
    display: flex;
    align-items: center;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border: 1px solid #ccc;
    span {
      display: inline-block;
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;
    }
    .bottom-title {
      @include font-size($font-large);
    }
  }
}
</style>
