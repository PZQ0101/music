<template>
  <Header>
    <div class="header-left" @click.stop="back" slot="left"></div>
    <div class="header-title" slot="center">{{ title }}</div>
    <div class="header-right" slot="right"></div>
  </Header>
</template>

<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
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
</style>
