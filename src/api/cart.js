import request from '../utils/request'
export const addCart = (goodsId,goodsNum,goodsSkuId) => {
    return request.post('/cart/add', {
        goodsId,
        goodsNum,
        goodsSkuId
    })
}
// 获取购物车列表
export const getCartList = () => {
    return request.get('/cart/list')
}
// 更新购物车商品列表
export const changeCount = (goodsId,goodsNum,goodsSkuId) => {
    return request.post('/cart/update',{
       goodsId,
    goodsNum,
    goodsSkuId 
    })
}
// 删除购物车功能
export const delSelect = (cartIds) => {
    return request.post('cart/clear',{
        cartIds
    })
}
