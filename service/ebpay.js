const crypto = require('crypto');
const { 
  EBPAY_HASHIV,
  EBPAY_HASHKEY,
  EBPAY_MerchantID,
  EBPAY_Version,
  EMPAY_RespondType 
} = process.env

function getDataChain(order) {
  let result = []
  for (const [key, value] of Object.entries(order)) {
    if (key == 'ItemDesc' || key == 'Email') {
      result.push(`${key}=${encodeURIComponent(value)}`);
    } else {
      result.push(`${key}=${value}`);
    }
  }
  return result.join('&');
}

function encrypt(TradeInfo) {
  const encrypt = crypto.createCipheriv('aes256', EBPAY_HASHKEY, EBPAY_HASHIV);
  const enc = encrypt.update(getDataChain(TradeInfo), 'utf8', 'hex');
  return enc + encrypt.final('hex');
}

function shaEncrypt(encrypt) {
  const sha = crypto.createHash('sha256');
  const plainText = `HashKey=${EBPAY_HASHKEY}&${encrypt}&HashIV=${EBPAY_HASHIV}`;
  return sha.update(plainText).digest('hex').toUpperCase();
}

function decrypt(TradeInfo) {
  const decrypt = crypto.createDecipheriv('aes256', EBPAY_HASHKEY, EBPAY_HASHIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, 'hex', 'utf8');
  const plainText = text + decrypt.final('utf8');
  const result = plainText.replace(/[\x00-\x20]+/g, '');
  return JSON.parse(result);
}

function setTradeInfo(Amt, ItemDesc, Email, id) {
  const order = {
    MerchantID: EBPAY_MerchantID,
    RespondType: EMPAY_RespondType,
    TimeStamp: Date.now(),
    Version: EBPAY_Version,
    MerchantOrderNo: Date.now(),
    Amt,
    ItemDesc,
    Email,
  };

  const tradeInfo = encrypt(order);
  const tradeInfoSha = shaEncrypt(tradeInfo);

  return {
    EBPay: {
      MerchantID: EBPAY_MerchantID,
      TradeInfo: tradeInfo,
      TradeSha: tradeInfoSha,
      Version: EBPAY_Version,
      MerchantOrderNo: order.MerchantOrderNo
    },
    mongoose: {
      MerchantOrderNo: order.MerchantOrderNo
    },
  };
}

module.exports = { setTradeInfo, decrypt };