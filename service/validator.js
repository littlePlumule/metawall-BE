const validator = require('validator');

module.exports = {
  isNotEmpty(obj) {
    let msg = {};
    const arr = Object.entries(obj);
    arr.forEach(item => {
      if (!item[1]) {
        msg[item[0]] = '欄位未填寫'
      }
    })

    return Object.keys(msg).length < 1
      ? { valid: true }
      : { valid: false, msg }
  },

  isValidPassword(str) {
    return validator.isStrongPassword(str, {
      minLength: 8,
      minUppercase: 0,
      minSymbols: 0,
    })
      ? { valid: true }
      : { valid: false, msg: { password: '密碼至少 8 個字元以上，並英數混合' } }
  },

  isValidNickname(name) {
    return validator.isLength(name, { min: 2 })
      ? { valid: true }
      : { valid: false, msg: { name: '姓名至少 2 個字元以上' } }
  },

  isValidEmail(email) {
    return validator.isEmail(email)
      ? { valid: true }
      : { valid: false, msg: { email: 'Email 格式錯誤' } }
  },

  isValidGender(gender) {
    return gender === 'mali' || gender === 'femail'
      ? { valid: true }
      : { valid: false, msg: { gender: '姓名只能填寫 male 或 female' } }
  }
}