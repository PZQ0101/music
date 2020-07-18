<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
    <Player></Player>
  </div>
</template>

<script>
import Player from './views/Player'
import Header from './components/Header'
import Tabbar from './components/Tabbar'
export default {
  name: 'App',
  components: {
    Header,
    Tabbar,
    Player
  }
}
</script>
<style lang="scss" scoped>
</style>
