const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  donateFrom: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, '請填寫 User ID']
  },
  donateTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, '請填寫 User ID']
  },
  tradeNo: {
    type: String,
    default: ''
  },
  merchantOrderNo: {
    type: String,
    required: [true, '請填寫訂單編號'],
    unique: true
  },
  itemDesc: {
    type: String,
    requried: [true, '請填寫商品名稱']
  },
  amt: {
    type: Number,
    required: [true, '請填寫金額']
  },
  paymentType: {
    type: String,
    enum: ['WEBATM', 'VACC', 'CVS', 'BARCODE']
  },
  paymentStatus: {
    type: Boolean,
    default: false
  },
  payTime: {
    type: String,
    default: 0
  }
}, { versionKey: false });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;