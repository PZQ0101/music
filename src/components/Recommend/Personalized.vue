<template>
  <div class="personalized" ref="personalized">
    <div class="personalized-top">{{ title }}</div>
    <div class="personalized-bottom">
      <div class="item" v-for="value in personalized" :key="value.id" @click="setRt(value.id)">
        <!-- <img :src="value.picUrl" alt=""> -->
        <img v-lazy="value.picUrl" alt="" />
        <p>{{ value.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: {
    personalized: {
      type: Array,
      default: () => [],
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    type: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    setRt (id) {
      this.$emit('setRouter', id, this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.personalized {
  @include bg_sub_color();
  @include font_color();
  .personalized-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
  }
  .personalized-bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-top: 20px;
    .item {
      width: 200px;
      height: 300px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 20px;
      }
      p {
        @include clamp(2);
        @include font-size($font_medium_s);
        text-align: center;
      }
    }
  }
}
</style>
