<template>
  <div class="header">
    <div class="header-left" @click="hiddenNomalPlayer"></div>
    <div class="header-title">
      <h3 class="song-name">苦瓜</h3>
      <p class="singer-name">陈奕迅</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapActions([
      'setFullScreen', // 将 `this.setFullScreen()` 映射为 `this.$store.dispatch('setFullScreen')`
      'setMiniPlayer'
    ]),
    hiddenNomalPlayer () {
      this.setFullScreen(false)
      this.setMiniPlayer(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable';
@import '../../assets/css/mixin';
.header {
  width: 100%;
  height: 100px;
  display: flex;
  .header-left {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    @include bg_img('../../assets/images/down');
  }
  .header-title {
    position: fixed;
    left: 84px;
    right: 84px;
    text-align: center;
    padding-top: 10px;
    @include font-size($font_medium);
    color: #fff;
  }
}
</style>
