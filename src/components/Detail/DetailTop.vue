<template>
  <div class="detail-top">
    <img :src="path" alt="" />
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-top {
  width: 100%;
  height: 500px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
</style>
