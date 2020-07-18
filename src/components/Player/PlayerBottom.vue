<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progerss-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-controll">
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerBottom'
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.player-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    @include font_color();
    .progress-bar {
      margin: 0 10px;
      height: 10px;
      width: 100%;
      background: #fff;
      position: relative;
      .progress-line {
        width: 50%;
        height: 100%;
        background: #ccc;
        display: flex;
        align-items: center;
        .progerss-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
        }
      }
    }
  }
  .bottom-controll {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 80%;
    padding: 50px 0;
    div {
      width: 84px;
      height: 84px;
    }
    .mode {
      @include bg_img('../../assets/images/loop');
    }
    .prev {
      @include bg_img('../../assets/images/prev');
    }
    .play {
      @include bg_img('../../assets/images/pause');
    }
    .next {
      @include bg_img('../../assets/images/next');
    }
    .favorite {
      @include bg_img('../../assets/images/un_favorite');
    }
  }
}
</style>
