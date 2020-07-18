<template>
  <swiper :options="swiperOption" class="player-middle">
    <swiperSlide class="cd">
      <div class="cd-wrapper">
        <img
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=250474341,339329520&fm=26&gp=0.jpg"
          alt=""
        />
      </div>
      <p>你要好好的呀哒哒哒</p>
    </swiperSlide>
    <swiperSlide class="lyrics">
      <ScrollView>
        <ul>
          <li>我是第1句歌词</li>
          <li>我是第2句歌词</li>
          <li>我是第3句歌词</li>
          <li>我是第4句歌词</li>
          <li>我是第5句歌词</li>
          <li>我是第6句歌词</li>
          <li>我是第7句歌词</li>
          <li>我是第8句歌词</li>
          <li>我是第9句歌词</li>
          <li>我是第10句歌词</li>
          <li>我是第11句歌词</li>
          <li>我是第12句歌词</li>
          <li>我是第13句歌词</li>
          <li>我是第14句歌词</li>
          <li>我是第15句歌词</li>
          <li>我是第16句歌词</li>
          <li>我是第17句歌词</li>
          <li>我是第18句歌词</li>
          <li>我是第19句歌词</li>
          <li>我是第20句歌词</li>
          <li>我是第21句歌词</li>
          <li>我是第22句歌词</li>
          <li>我是第23句歌词</li>
          <li>我是第24句歌词</li>
          <li>我是第25句歌词</li>
          <li>我是第26句歌词</li>
          <li>我是第27句歌词</li>
          <li>我是第28句歌词</li>
          <li>我是第29句歌词</li>
          <li>我是第30句歌词</li>
          <li>我是第31句歌词</li>
          <li>我是第32句歌词</li>
          <li>我是第33句歌词</li>
          <li>我是第34句歌词</li>
          <li>我是第35句歌词</li>
          <li>我是第36句歌词</li>
          <li>我是第37句歌词</li>
          <li>我是第38句歌词</li>
          <li>我是第39句歌词</li>
          <li>我是第40句歌词</li>
          <li>我是第41句歌词</li>
          <li>我是第42句歌词</li>
          <li>我是第43句歌词</li>
          <li>我是第44句歌词</li>
          <li>我是第45句歌词</li>
          <li>我是第46句歌词</li>
          <li>我是第47句歌词</li>
          <li>我是第48句歌词</li>
          <li>我是第49句歌词</li>
          <li>我是第50句歌词</li>
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
  components: {
    swiper,
    swiperSlide,
    ScrollView
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
