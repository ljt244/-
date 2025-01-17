import { getInfo,setInfo } from '../../utils/storage'
export default {
    namespaced:true,
    state () {
        return {
            // 个人权证相关信息
          userInfo: getInfo()
        }
    },
    mutations: {
        // 所有mutations的第一个参数，都是state
        setUserInfo (state,obj) {
         state.userInfo = obj
         setInfo(obj)
        }
    },
    actions: {
        logout (context) {
     context.commit('setUserInfo',{})
    //  跨模块调用mutation
     context.commit('cart/setCartList',[],{root:true})
        }
    },
    getters: {}
}