<template>
  <div class="detail">
    <DetailHeader :title="playlist.name"></DetailHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="detailtop"></DetailTop>
    <div class="bottom">
      <ScrollView ref="scrollView">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import DetailHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
import { getPlaylist, getAlbum } from '../api/index'
export default {
  name: 'Detail',
  components: {
    DetailHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  data: function () {
    return {
      playlist: {}
    }
  },
  created () {
    if (this.$route.params.type === 'personalized') {
      getPlaylist({ id: this.$route.params.id })
        .then(response => {
          this.playlist = response.data.playlist
        })
        .catch(err => {
          console.log(err)
        })
    } else if (this.$route.params.type === 'album') {
      getAlbum({ id: this.$route.params.id })
        .then(response => {
          this.playlist = {
            name: response.data.album.name,
            coverImgUrl: response.data.album.picUrl,
            tracks: response.data.songs
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    // this.$refs.scrollView.$el是获取组件的根元素
    const offsetHeight = this.$refs.scrollView.$el.offsetHeight
    this.$refs.scrollView.getscrollY(offsetY => {
      if (offsetY > 0) {
        // 向下滚动放大
        const scale = 1 + (4 * offsetY) / offsetHeight
        this.$refs.detailtop.$el.children[0].style.transform = `scale(${scale})`
      } else {
        // 向上滚动高斯模糊
        const scale = (10 * Math.abs(offsetY)) / offsetHeight
        this.$refs.detailtop.$el.style.filter = `blur(${scale}px)`
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
.detail {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    left: 0;
    right: 0;
    top: 500px;
    bottom: 0;
  }
}
</style>
