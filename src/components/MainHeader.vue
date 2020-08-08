<template>
  <Header>
    <div class="header-left" slot="left"></div>
    <div class="header-title" slot="center">无双音乐</div>
    <div class="header-right" @click.stop="account" slot="right"></div>
  </Header>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    account () {
      this.$router.push('/account')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable';
@import '../assets/css/mixin';
.header-left,
.header-right {
  width: 100%;
  height: 100%;
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
</style>
