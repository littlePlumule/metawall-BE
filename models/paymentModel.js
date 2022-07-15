const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, '請填寫 User ID']
  },
  itemDesc: {
    type: String,
    requried: [true, '請填寫商品名稱']
  },
  amt: {
    type: Number,
    required: [true, '請填寫金額']
  },
  merchantOrderNo: {
    type: String,
    required: [true, '請填寫訂單編號'],
    unique: true
  },
  paymentType: {
    type: String,
    enum: ['WEBATM', 'VACC', 'CVS', 'BARCODE']
  },
  paymentStatus: {
    type: Number,
    default: 0
  },
  payTime: {
    type: Number,
    default: 0
  }
}, { versionKey: false });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = Payment;