<template>
  <div class="player">
    <NomalPlayer></NomalPlayer>
    <MiniPlayer @show="showListPlayer"></MiniPlayer>
    <ListPlayer ref="ListPlayer"></ListPlayer>
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
  },
  methods: {
    showListPlayer () {
      this.$refs.ListPlayer.show()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
