<template>
  <div class="header">
    <div class="header-left" @click="back"></div>
    <div class="header-title">{{title}}</div>
    <div class="header-right"></div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data: function () {
    return {
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
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
  }
  .header-left {
    @include bg_img('../../assets/images/back');
  }
  .header-right {
    @include bg_img('../../assets/images/more');
  }
  .header-title {
    text-align: center;
    line-height: 100px;
    @include font-size($font_medium);
    color: #fff;
    font-weight: bold;
    @include no-wrap();
  }
}
</style>
