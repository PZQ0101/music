<template>
  <div class="header" @click="changeTheme">
    <div class="left">
      <slot name="left">左边</slot>
    </div>
        <div class="center">
      <slot name="center">中间</slot>
    </div>
        <div class="right">
      <slot name="right">右边</slot>
    </div>
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
  .left,
  .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
}
</style>
