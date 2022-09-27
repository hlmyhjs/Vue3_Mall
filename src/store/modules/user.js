import { TOKEN } from '@/constant'
import router from '@/router'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {
      loginStatus: false, //登录状态
      username: ''
    }
  }),
  mutations: {
    setToken(state, user) {
      state.userInfo.loginStatus = true
      state.userInfo.username = user.username
      state.token = user.token
      setItem(TOKEN, user.token)
      setItem('user_info', state.userInfo)
      setTimeStamp() // 保存登录时间
    },

    loginOut(state) {
      state.userInfo.loginStatus = false
      state.userInfo.username = null
      state.token = null
      removeAllItem()
      router.push('/login')
    }
  },
  actions: {}
}
