import request from '@/utils/request'
    //  订单结算确认
    //  mode ：cart =》obj（cartIds）
    //  mode ：buynow =》obj（goodsid，goodsnum，goodskuid）
export const checkOrder = (mode,obj) => {
   return request.get('/checkout/order',{
    params: {
          mode, //  cart buynow
        delivery: 10, //    10快递配送 20门店自提
        couponId: 0, // 优惠券id ，传0，不需要优惠券
        isUsePoints: 0, //  积分 0 不使用积分
        ...obj //   将传递过来的参数动态展开
    }
    })
}
// 提交订单
export const submitOrder = (mode,obj) => {
    return request.get('/checkout/submit',{
     params: {
           mode, //  cart buynow
         delivery: 10, //    10快递配送 20门店自提
         couponId: 0, // 优惠券id ，传0，不需要优惠券
         isUsePoints: 0, //  积分 0 不使用积分
         payType: 10, // 余额支付
         ...obj //   将传递过来的参数动态展开
     }
     })
 }
 // 订单列表
export const getMyOrderList = (dataType, page) => {
    return request.get('/order/list', {
      params: {
        dataType,
        page
      }
    })
  }
  // 订单支付
  export const getMyOrderPay = (orderId,payType) => {
    return request.get('/order/pay', {
      params: {
        orderId,
        payType
      }
    })
  }
  // 取消订单
  export const MyorderCancel = (orderId) => {
    return request.post('/order/cancel', {
        orderId
    })
  }