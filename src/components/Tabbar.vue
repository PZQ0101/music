<template>
  <div class="tabbar">
    <router-link to="/recommend" tag="div" class="item">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer" tag="div" class="item">
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" tag="div" class="item">
      <span>排行</span>
    </router-link>
    <router-link to="/search" tag="div" class="item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
.tabbar {
  width: 100%;
  height: 84px;
  @include bg_sub_color();
  display: flex;
  justify-content: space-around;
  .item {
    @include font_color();
    span {
      line-height: 84px;
    }
  }
  .router-link-active {
    @include font_active_color();
    @include border_active_color();
  }
}
</style>
