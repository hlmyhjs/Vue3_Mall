import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { isCheckTimeout } from '@/utils/auth'

axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这个位置需要统一的去注入token
    if (store.getters.token) {
      // 处理前端登录超时(2小时)
      if (isCheckTimeout()) {
        // 登出操作
        store.commit('user/loginOut')
        return Promise.reject(new Error('登录过期请重新登录'))
      }
      // 如果token存在 注入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, msg } = response.data
    //   要根据success的成功与否决定下面的操作
    if (success) {
      return response.data
    } else {
      // 处理后端token过期(1天)
      if (response.data.code === '10101') {
        Toast.fail('登录过期请重新登录')
        store.commit('user/loginOut')
        return
      } else if (response.data.code === '10102') return // 未登录

      // 后端其他业务错误处理
      Toast.fail(msg)
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    // 处理 token 超时问题
    if (error.response && error.response.data && error.response.data.code === 401) {
      // token超时
      // store.dispatch('user/logout')
      // Toast.fail(error?.response?.data?.msg)
      console.log('token超时')
    }

    /**
     * error.message:
     * 上方请求拦截中, 登录超时退出登录抛出的error文本
     */
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service
