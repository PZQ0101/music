<template>
  <div class="header" @click="changeTheme">
    <div class="header-left" @click.stop="back"></div>
    <div class="header-title">
        <li :class="{'active' : switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
        <li :class="{'active' : switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
    }
  },
  methods: {
    changeTheme: function () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    },
    switchItem (num) {
      this.switchNum = num
      this.$emit('switchItem', num)
    },
    back () {
      window.history.back()
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
    @include bg_img('../../assets/images/back');
  }
  .header-right {
    @include bg_img('../../assets/images/more');
  }
  .header-title {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    border-radius: 10px;
    @include font_size($font_medium);
    @include no-wrap();
    height: 60px;
    margin-top: 20px;
    list-style: none;
    li{
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255, 0.3);
      }
    }
  }
}
</style>
