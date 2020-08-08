import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch((err) => err)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('../views/Rank').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('../views/Singer').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('../views/Search').then((module) => {
    resolve(module)
  })
}

const Detail = (resolve) => {
  import('../views/Detail').then((module) => {
    resolve(module)
  })
}

const Account = (resolve) => {
  import('../views/Account').then((module) => {
    resolve(module)
  })
}
const routes = [{
  path: '/',
  redirect: '/recommend'
},
{
  path: '/recommend',
  component: Recommend,
  children: [
    {
      path: 'detail/:id/:type',
      component: Detail
    }
  ]
},
{
  path: '/singer',
  component: Singer,
  children: [
    {
      path: 'detail/:id/:type',
      component: Detail
    }
  ]
},
{
  path: '/rank',
  component: Rank,
  children: [
    {
      path: 'detail/:id/:type',
      component: Detail
    }
  ]
},
{
  path: '/search',
  component: Search
},
{
  path: '/account',
  component: Account
}
]

const router = new VueRouter({
  // mode: 'history',
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router
