<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      // 解决click事件失效
      click: true
    })

    const observer = new MutationObserver((mutationList, observer) => {
      // console.log(mutationList)
      // console.log(this.iscroll.maxScrollY)
      this.iscroll.refresh()
      // console.log(this.iscroll.maxScrollY)
    })
    // 2.告诉观察者对象我们需要观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提供一个获取滚动方法给外界使用（外界可以通过获取该组件来调用该方法）
    getscrollY (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => {
        this.iscroll.refresh()
      }, 100)
    }
  }
}
</script>

<style scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>
