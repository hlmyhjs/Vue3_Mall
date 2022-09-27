import request from '@/utils/request'

/**
 * 发送验证码
 */
export const sendCode = (data) => {
  return request({
    url: '/sendCode',
    method: 'POST',
    data
  })
}

/**
 * 注册
 */
export const register = (data) => {
  return request({
    url: '/users/register',
    method: 'POST',
    data
  })
}

/**
 * 注册
 */
export const loginApi = (data) => {
  return request({
    url: '/users/login',
    method: 'POST',
    data
  })
}

/**
 * 修改密码
 */
export const changePassword = (data) => {
  return request({
    url: '/users',
    method: 'PATCH',
    data: {
      username: data?.username,
      password: data?.newPassword && data?.reNewPassword,
      verifyCode: data?.verifyCode
    }
  })
}

/**
 * 验证码登录
 */
export const authCodeLogin = (data) => {
  return request({
    url: '/users/authCodeLogin',
    method: 'POST',
    data
  })
}
