<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
// 有三个版本的iscroll，根据需求导入相应的版本
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    // 用this就是给这个组件添加方法，相当于在data，methods一样
    this.iscroll = new IScroll(this.$refs.wrapper, {
      // 一下这些配置在iscroll的基本功能那里都有
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题（优化配置）
      scrollX: false,
      scrollY: true,
      disablePointer: true, // 由于知道是用于手机端，所以把指针、鼠标事件禁止用掉，留touch事件。以免浪费资源
      disableTouch: false,
      disableMouse: true,
      click: true // 解决click事件失效
    })
    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化, 就会执行传入的回调函数
    mutationList: 发生变化的数组
    observer: 观察者对象
    * */
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
/*
注意点：
1、iscroll需要三层结构，并且里面的内容必须大于外面两层容器才能滚动
2、由于里面的东西都是从网络上加载过来的数据，所以刚开始的内容高度是没有大于容器的高度的，所以要在加载内容之后重新计算高度

 */
</style>
