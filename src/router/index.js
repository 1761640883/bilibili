import Vue from 'vue'
import VueRouter from 'vue-router'
import mine from './mine'
import home from './home'
import articles from './article'

Vue.use(VueRouter)

const routes = [
  mine,
  home,
  articles,
  {
    path: '*',
    redirect: 'home'
  }
]

const router = new VueRouter({
  base: 'vue-bilibili',
  routes
})

router.beforeEach((to, from ,next)=>{// 路由拦截器，在router中的引用方法
  // console.log(to)
  if(!localStorage.getItem('id') && !localStorage.getItem('token') && to.meta.istoken){
    next('/mine/login')
    Vue.prototype.$Modal.info({
      title: '提示',
      content: `<p>请先登录</p>`
    });
    return;
  }
  next();
  // if(to.path !== '/mine/login'){// 因为没有设置哪些页面可以触发，从而导致要去的页面也会触发beforeEach一直触发，导致一直触发，造成（超过最大呼叫堆栈大小在解析路径）请求过多崩溃了。然后设置了这个判断。但是后面又补上了设置，这里就不用了
  //   next('/mine/login')
  //   return;
  // }
})


// 出现报错Avoided redundant navigation to current location: "/home".（就在router的index.js写入下面代码）
/* const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
} */
// 这个也可以
const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router
