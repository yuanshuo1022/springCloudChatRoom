import VueRouter from 'vue-router'
 
import ChatHome from '../view/pages/chatHome/index.vue'
import login from  '../view/pages/user/login.vue'
import register from '../view/pages/user/register.vue'
import Video from '../view/pages/video.vue'
import Lingting from '../view/pages/lingting.vue'
import Setting from '../view/pages/setting.vue'
import ChatWindow from '../view/pages/chatHome/chatwindow.vue'
const routes = [
    {
        path:"/login",
        name: "login",
        component: login,

    },
    {
        path:"/register",
        name:"register",
        component:register,
    },
    {
        path: "/",
        redirect: "/login",
      },
    {
        path: "/ChatHome",
        name: "ChatHome",
        component: ChatHome,
       
    },    
    {
        path: "/Video",
        name: "Video",
        component: Video
    }, 
    {
        path: "/Lingting",
        name: "Lingting",
        component: Lingting
    },   
    {
        path: "/Setting",
        name: "Setting",
        component: Setting
    },    
]
  const router = new VueRouter({
    routes
  })


  // router.beforeEach((to, from, next) => {
  //   const isAuthenticated = localStorage.getItem('token')
  
  //   if (to.path === '/login' || to.path === '/register'||to.path === '/') {
  //     next()
  //   } else  {
  //     if (isAuthenticated) {
  //       console.log("已登录"+token)
  //       next()
  //     } else {
  //       Vue.prototype.$message.error('请先登录')
  //       next('/login')
  //     }
  //   } 
    
  // })

export default router