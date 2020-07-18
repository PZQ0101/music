<template>
  <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <div class="header-title">无双音乐</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme: function () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
      console.log(11)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable';
@import '../assets/css/mixin';
.header {
  width: 100%;
  height: 100px;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  .header-left,
  .header-right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    // background: #000;
  }
  .header-left {
    @include bg_img('../assets/images/logo');
  }
  .header-right {
    @include bg_img('../assets/images/account');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    @include font-size($font_medium);
    color: #fff;
    font-weight: bold;
  }
}
</style>
