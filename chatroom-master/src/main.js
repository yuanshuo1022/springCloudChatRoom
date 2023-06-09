import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router'
import router from './router/index'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9025' // 设置API的基本URL

// 添加请求拦截器，在每个请求发送之前设置Authorization头部
axios.interceptors.request.use(
  
  config => {
    const token = localStorage.getItem('token');
    if (token&& config && config.url && (config.url.indexOf('/api/login') === -1) && (config.url.indexOf('/api/register') === -1)&&(config.url.indexOf('/api/sendVerCode') === -1)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log('请求拦截错误:', error);
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // 如果返回401未授权状态码，跳转到登录页面
      router.push('/login');
    }else if(error.response.status === 429){
      ElementUI.Message.warning("请勿请求过于频繁");
    }
    return Promise.reject(error);
  }

)

// 将axios实例绑定到Vue原型上，使其在组件中可通过this.$http访问
Vue.prototype.$http = axios

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
