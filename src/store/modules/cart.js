import { getCartList,changeCount,delSelect } from '@/api/cart'
import { Toast } from 'vant'
export default {
    namespaced:true,
    state () {
        return {
          cartList:[],
          sum:0
        }
    },
    mutations: {
      // 提供一个cartList的mutations
      setCartList (state,newList) {
state.cartList = newList
      },
      toggleCheck (state,goodsid) {
        // 让所有的选中的id选取反
        const goods = state.cartList.find(item => item.goods_id === goodsid)
          goods.isChecked = !goods.isChecked
      },
      toggleAllChecked (state,checked) {
        // 让所有小复选框同步
state.cartList.forEach(item => {
  item.isChecked = checked
})
      }
    },
    actions: {
       async getCartAction (context) {
            const {data} = await getCartList()
            // 后台返回的时候不包含复选框，手动添加一个
            data.list.forEach(item => {
                item.isChecked = true
            });
            context.commit('setCartList',data.list)
        },
       async changeCountAction (context,obj) {
const { goodsNum,goodsId,goodsSkuId} = obj
 const res = await changeCount(goodsId,goodsNum,goodsSkuId)
 console.log(res);
        },
       async delAction (context) {
        const cartlist = context.getters.selCartList
       const newcartlist = cartlist.map(item => {
            return item.id
       })
       console.log(newcartlist);
       await delSelect(newcartlist)
       Toast('删除成功')
      //  重新渲染购物车数据
      context.dispatch('getCartAction')
        }
    },
    getters: {
      // 商品总数
       cartTotal (state) {
return state.cartList.reduce((sum,item) => sum + (+item.goods_num),0)
       },
      //  选中的商品项
       selCartList (state) {
return state.cartList.filter(item => item.isChecked)
       },
      //  选中商品数
      selCount (state,getters) {
         return getters.selCartList.reduce((sum,item) => sum + (+item.goods_num),0)
      },
      //  商品总价
       selPrice (state,getters) {
return getters.selCartList.reduce((sum,item) => {
 const total = sum + (item.goods.goods_price_min * item.goods_num)
 console.log(total);
 return total
},0)
       },
      //  全选复选框按钮
       smallallxuan (state) {
return state.cartList.every(item => item.isChecked)
       }
    }
}
