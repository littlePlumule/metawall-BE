const Payment = require('../models/paymentModel');
const httpResponse = require('../service/resHandle');
const { appError } = require('../service/errorHandler');
const { setTradeInfo, decrypt } = require('../service/ebpay');
const { isNotEmpty, isValidEmail } = require('../service/validator');

const order = {
  async createOrder(req, res, next) {
    const { id } = req.user;
    let { Email, Amt, ItemDesc } = req.body;
    const result = setTradeInfo(Amt, ItemDesc, Email);

    Email = Email ? Email.trim() : Email;
    Amt = Amt ? Amt.trim() : Amt;
    ItemDesc = ItemDesc ? ItemDesc.trim() : ItemDesc;

    if (!isNotEmpty({ Email, Amt, ItemDesc }).valid) {
      return next(appError(400, 1, isNotEmpty({ Email, Amt, ItemDesc }).msg));
    }

    if (!isValidEmail(Email).valid) {
      return next(appError(400, 1, isValidEmail(Email).msg));
    }

    await Payment.create({
      user: id,
      itemDesc: ItemDesc,
      merchantOrderNo: result.mongoose.MerchantOrderNo,
      amt: Amt
    });

    httpResponse(res, result.EBPay);
  },
  async notify(req, res, next) {
    console.log('notify', req.body);
  },
  async getOrders(req, res, next) {
    const { id } = req.user;
    const orders = await Payment.find({ user: id }).select('-user');

    httpResponse(res, orders)
  },
  async getOrder(req, res, next) {
    const { orderNo } = req.params;
    const { id } = req.user
    const order = await Payment.findOne({ merchantOrderNo: orderNo });

    if (!order) {
      return next(appError(400 , 3, '無此訂單編號'));
    }

    if (order.user.toString() !== id) {
      return next(appError(400, 5, { user_id: '您並非購物者，無法觀看此訂單內容' }))
    }

    httpResponse(res, order);    
  }
};

module.exports = order;