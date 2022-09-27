import { Toast } from 'vant'

/**
 * 验证手机号
 */
export function validePhone(phone) {
  if (valideIsEmpty(phone, '请输入手机号码')) {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      Toast('请输入正确的手机号码')
      return false
    } else {
      return true
    }
  }
}

/**
 * 验证邮箱
 */
export function valideMail(mail) {
  if (valideIsEmpty(mail, '请输入QQ邮箱')) {
    if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(mail)) {
      Toast('请输入正确的邮箱')
      return false
    } else {
      return true
    }
  }
}

/**
 * 验证密码: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,10}$/
 * 1.需包含数字和大小写字母中至少两种字符的5-10位字符
 * 2.请输入最少为6为字符
 * 3.为了保证您的账号安全，需包含数字和大小写字母中至少两种字符的6-10位字符!
 * 4.两次密码输入不一致
 */
export function validateLogin(params) {
  // if (valideIsEmpty(params.username, '电话号码或邮箱不能为空')) {
  if (valideIsEmpty(params.username, '邮箱不能为空')) {
    // if (/^1[3456789]\d{9}$/.test(params.username) || /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(params.username)) {
    if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(params.username)) {
      if (valideIsEmpty(params.password, '密码不能为空')) {
        if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,12}$/.test(params.password)) {
          Toast('请输入6-12位字母或数字密码')
          return false
        } else {
          return true
        }
      }
    } else {
      Toast('请输入正确格式的邮箱')
      return false
    }
  }
}

/**
 * 验证验证码
 */
export const valideCode = (code, emailCode) => valideIsEmpty(code, '请输入验证码')

/**
 * 确认密码
 */
export function confirmPassword(password, confirmPassword) {
  if (
    valideIsEmpty(password, '请输入密码') &&
    validatePassword(password) &&
    valideIsEmpty(confirmPassword, '请再次输入密码')
  ) {
    if (password !== confirmPassword) {
      Toast('两次密码输入不一致')
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

/**
 * 验证参数是否为空
 * @param {*} params
 * @param {*} message
 * @returns
 */
function valideIsEmpty(params, message) {
  if (['', null, undefined].includes(params)) {
    Toast(message)
    return false
  } else {
    return true
  }
}

function validatePassword(validatePassword) {
  if (!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)[0-9A-Za-z]{6,12}$/.test(validatePassword)) {
    Toast('请输入6-12位字母或数字密码')
    return false
  } else {
    return true
  }
}
