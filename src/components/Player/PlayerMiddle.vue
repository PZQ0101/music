<template>
  <swiper :options="swiperOption" class="player-middle">
    <swiperSlide class="cd">
      <div class="cd-wrapper" ref="cd">
        <img :src="this.currentSong.picUrl" alt="" />
      </div>
      <p>{{ this.lyric['0'] }}</p>
    </swiperSlide>
    <swiperSlide class="lyrics">
      <ScrollView>
        <ul>
          <li v-for="(value, key) in this.lyric" :key="key">{{ value }}</li>
        </ul>
      </ScrollView>
    </swiperSlide>
    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import ScrollView from '../ScrollView'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlayerMiddle',
  data () {
    return {
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ])
  },
  components: {
    swiper,
    swiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'lyric', 'currentSong', 'songs'])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cd.classList.add('active')
      } else {
        this.$refs.cd.classList.remove('active')
      }
    },
    currentSong (newValue, oldValue) {
      if (newValue) {
        if (this.songs.length === 0) {
          return
        }
        this.getSongLyric(this.currentSong.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.player-middle {
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd {
    .cd-wrapper {
      width: 500px;
      height: 500px;
      border: 30px solid #fff;
      border-radius: 50%;
      margin: 0 auto;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
      margin-top: 50px;
      @include font_color();
    }
  }
  .lyrics {
    text-align: center;
    @include font_size($font_medium);
    @include font_color();
    li {
      margin: 10px 0;
      &:last-of-type {
        padding-bottom: 100px;
      }
    }
  }
}
@keyframes sport {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss">
@import '../../assets/css/mixin';
.my-bullet {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 20px;
}
.my-bullet-active {
  width: 60px;
  @include bg_color();
}
</style>
