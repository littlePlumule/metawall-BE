const validator = require('validator');

module.exports = {
  /**
   * @decription - 驗證欄位是否為空
   * @param {Object} obj 
   * @returns 
   */
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

  /**
   * 驗證密碼格式
   * @param {String} str 
   * @returns 
   */
  isValidPassword(str) {
    return validator.isStrongPassword(str, {
      minLength: 8,
      minUppercase: 0,
      minSymbols: 0,
    })
      ? { valid: true }
      : { valid: false, msg: { password: '密碼至少 8 個字元以上，並英數混合' } }
  },

  /**
   * @decription - 驗證暱稱格式
   * @param {String} name 
   * @returns 
   */
  isValidNickname(name) {
    return validator.isLength(name, { min: 2 })
      ? { valid: true }
      : { valid: false, msg: { name: '姓名至少 2 個字元以上' } }
  },

  /**
   * @decription - 驗證 Email 格式
   * @param {String} email 
   * @returns 
   */
  isValidEmail(email) {
    return validator.isEmail(email)
      ? { valid: true }
      : { valid: false, msg: { email: 'Email 格式錯誤' } }
  },

  /**
   * @decription - 驗證性別格式
   * @param {String} gender 
   * @returns 
   */
  isValidGender(gender) {
    return gender === 'male' || gender === 'female'
      ? { valid: true }
      : { valid: false, msg: { gender: '性別只能填寫 male 或 female' } }
  },

  /**
   * @decription - 驗證當前頁碼
   * @param {String} page 
   * @returns
   */
  isValidPage(page) {
    return page
      ? validator.isInt(page.toString())
        ? Math.max(1, Number(page))
        : 1
      : 1
  },

  /**
   * @decription - 驗證單頁筆數
   * @param {String} limit 
   * @returns
   */
  isValidLimit(limit) {
    return limit
      ? validator.isInt(limit.toString()) && Number(limit) > 0
        ? Number(limit)
        : 10
      : 10
  }
}