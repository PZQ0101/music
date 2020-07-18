<template>
  <div class="nomal-player" v-show="this.isShowNomalPlayer">
    <div class="player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
      <img
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=250474341,339329520&fm=26&gp=0.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters } from 'vuex'
export default {
  name: 'NomalPlayer',
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerBottom
  },
  computed: {
    ...mapGetters([
      'isShowNomalPlayer'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
.nomal-player {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  .player-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      filter: blur(5px);
    }
  }
}
</style>
