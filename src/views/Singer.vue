<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li
            class="list-group"
            v-for="(value, index) in list"
            :key="index"
            ref="group"
          >
            <h2 class="group-title">{{ keys[index] }}</h2>
            <ul>
              <li
                class="group-item"
                v-for="obj in list[index]"
                :key="obj.id"
                @click.stop="switchSinger(obj.id)"
              >
                <img v-lazy="obj.img1v1Url" alt="" />
                <p>{{ obj.name }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Singer',
  methods: {
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  components: {
    ScrollView
  },
  created () {
    getAllArtists()
      .then(result => {
        this.keys = result.keys
        this.list = result.list
        console.log(result)
      })
      .catch(function (err) {
        console.log(err)
      })
  },
  data: function () {
    return {
      keys: [],
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
.singer {
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  overflow: hidden;
  .singer-wrapper {
    width: 100%;
    height: 100%;
    @include bg_sub_color();
    .list-group {
      .group-title {
        padding: 10px 20px;
        @include bg_color();
      }
      ul {
        .group-item {
          display: flex;
          align-items: center;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 10px 20px;
          }
        }
      }
    }
  }
}
.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
