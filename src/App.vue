<template>
  <div id="app">
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <!-- <keep-alive include="Singer,Search"> -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import Player from './views/Player'
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'
export default {
  name: 'App',
  components: {
    MainHeader,
    Tabbar,
    Player
  }
}
</script>
<style lang="scss" scoped>
</style>
