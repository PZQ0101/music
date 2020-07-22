<template>
  <div class="player">
    <NomalPlayer></NomalPlayer>
    <MiniPlayer></MiniPlayer>
    <ListPlayer></ListPlayer>
  </div>
</template>

<script>
import NomalPlayer from '../components/Player/NomalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
export default {
  name: 'Player',
  components: {
    NomalPlayer,
    MiniPlayer,
    ListPlayer
  }
}
</script>

<style lang="scss" scoped>

</style>
