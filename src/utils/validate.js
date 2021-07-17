/**
 * 手机号验证
 * @param value 手机号
 * @returns {boolean}
 */
export function checkPhone(value) {
  const reg = /^1[3789]\d{9}$/
  return reg.test(value)
}

/**
 * 密码验证
 * @param value 密码(6-20位，数字+英文)
 */
export function checkPassword(value) {
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return reg.test(value)
}

/**
 * 确认密码验证
 * @param oVal 密码
 * @param nVal 确认密码
 * @returns {boolean} 是否相等
 */
export function checkRePassword(oVal, nVal) {
  return oVal === nVal
}

/**
 * 验证码验证
 * @param value 验证码
 */
export function checkCode(value) {
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6}$/
  return reg.test(value)
}
