<template>
  <div class="recommend">
    <ScrollViem>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized
          :personalized="personalized"
          :title="'推荐歌单'"
          @setRouter="setRouter"
          :type="'personalized'"
        ></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'" @setRouter="setRouter" :type="'album'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollViem>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
import ScrollViem from '../components/ScrollView'
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewmusic
} from '../api/index'
export default {
  name: 'Recommend',
  data: function () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created: function () {
    getBanner()
      .then(response => {
        this.banners = response.data.banners
      })
      .catch(function (e) {
        console.log(e)
      })

    getPersonalized()
      .then(response => {
        this.personalized = response.data.result
      })
      .catch(function (e) {
        console.log(e)
      })

    getNewAlbum()
      .then(response => {
        this.albums = response.data.albums.splice(0, 6)
      })
      .catch(function (e) {
        console.log(e)
      })

    getNewmusic()
      .then(response => {
        // this.songs = response.data.result
        const list = []
        response.data.result.forEach((value) => {
          const obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.song.album.picUrl
          let singer = ''
          for (let i = 0; i < value.song.artists.length; i++) {
            if (i === 0) {
              singer = value.song.artists[i].name
            } else {
              singer += '-' + value.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch(function (e) {
        console.log(e)
      })
  },
  methods: {
    setRouter (id, type) {
      // this.$router 相当于一个全局的路由器对象，this.$route是局部路由对象，每一个组件都会有一个局部的路由对象（获取当前hash信息，包括参数等等）
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  },
  components: {
    Banner,
    Personalized,
    SongList,
    ScrollViem
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  overflow: hidden;
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: all 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: all 1s;
}
</style>
