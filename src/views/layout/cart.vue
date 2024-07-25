<template>
  <div>
    <van-nav-bar
  title="购物车"
  left-arrow
  @click-left="$router.go(-1)"
/>
<div v-if="isLogin && cartList.length > 0">
<div class="middle">
  <div class="left">共{{cartTotal}}件商品</div>
  <div class="right" @click="bianji" v-if="isEdit" ><van-icon name="edit" />&nbsp;编辑</div>
  <div class="right" @click="quxiaobianji" v-else><van-icon name="clear" />&nbsp;取消编辑</div>
</div>
<!-- 商品列表 -->
<div class="bigbox">
  <div class="box" v-for="item in cartList" :key="item.goods_id">
  <van-checkbox :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
<div class="left">
  <img :src=item.goods.goods_image alt="">
</div>
<div class="right">
<p>{{ item.goods.goods_name }}</p>
<div class="price">
<span>￥{{item.goods.goods_price_min}}</span>
<CountBox @input="changeCount(item.goods_num,item.goods_id,item.goods_sku_id)" v-model="item.goods_num"></CountBox>
</div>
</div>
</div>
</div>
<van-submit-bar @submit="jiesuan" :price="price()" v-if="isEdit" :button-text="'结算'+selCount+'件'" :disabled="disable()">
  <van-checkbox  :value="smallallxuan" @click="allxuan">全选</van-checkbox>
</van-submit-bar>
<van-submit-bar @submit="handleDel" :price="price()" v-else :button-text="'删除'+selCount+'件'" :disabled="disable()">
  <van-checkbox  :value="smallallxuan" @click="allxuan">全选</van-checkbox>
</van-submit-bar>
</div>
<div class="empty" v-else>
  <img src="../../assets/empty.png" alt="">
  <div class="kong">你的购物车是空的，快去逛逛吧！</div>
  <p @click="$router.push('/')">去逛逛</p>
</div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import CountBox from '../../components/CountBox.vue';
export default {
name:'CartIndex',
components:{
    CountBox
  },
  data () {
    return {
      addCount:1,
      isEdit:true
    }
  },
props:{
    value:{
        type:Number,
        default:1
    }
},
methods:{
    decrease () {
        if (this.value <= 1) {
return
        }
this.$emit('input',this.value - 1)
    },
    add () {
        this.$emit('input',this.value + 1)
    },
    price () {
     return this.selPrice * 100
    },
    disable () {
if (this.selCount === 0) {
  return true
} else {
  return false
}
},
toggleCheck (goodsid) {
  this.$store.commit('cart/toggleCheck',goodsid)
},
allxuan () {
  this.$store.commit('cart/toggleAllChecked',!this.smallallxuan)
},
jiesuan () {
  if (this.selCount > 0) {
        // 有选中的 商品 才进行结算跳转
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.selCartList.map(item => item.id).join(','), // 'cartId,cartId,cartId'
            goodsId:this.cartList.map(item => item.goods_id).join(','),
            goodsNum:this.cartList.map(item => item.goods_num).join(','),
            goodsSkuId:this.cartList.map(item => item.goods_sku_id).join(',')
          }
        })
      }
},
changeCount (goodsNum,goodsId,goodsSkuId) {
  this.$store.dispatch('cart/changeCountAction',{
    goodsNum,
    goodsId,
    goodsSkuId
  })
},
bianji () {
  this.isEdit = !this.isEdit
},
quxiaobianji () {
  this.isEdit = !this.isEdit
},
handleDel () {
  if (this.selCount === 0) return
  this.$store.dispatch('cart/delAction')
}
},
computed : {
...mapState('cart',['cartList']),
...mapGetters('cart',['cartTotal','selCartList','selCount','selPrice','smallallxuan']),
isLogin () {
  const res = JSON.parse(localStorage.getItem('hm_shopping_info')) || ''
  return res.token
}
},
async created () {
  const local = JSON.parse(localStorage.getItem('hm_shopping_info')) || ''
  if (local.token) {
this.$store.dispatch('cart/getCartAction')
  }
}
}
</script>

<style scoped>
.middle{
position: relative;
  height: 30px;
  width: 100%;
  line-height: 30px;
  padding: 0 5px;
  background-color: rgba(128, 128, 128, 0.099);
}
.middle .left{
float: left;
}
.middle .right{
  position: absolute;
  right: 20px;
}
.bigbox{
  padding: 0 0 0 5px;
  background-color: rgba(128, 128, 128, 0.099);
 
}
.box{
  position: relative;
 height: 120px;
  margin-bottom: 10px;
  background-color: white;
  padding-left: 30px;
 
}
.box .van-checkbox{
  position: absolute;
  top: 50%;
  left: -0.2px;
}
.box .left{
  float: left;
  height: 120px;
  width: 120px;
}
.box .left img{
  height: 100%;
  width: 100%;
}
.box .right{
  float: left;
  height: 120px;
  width: 200px;

}
.box .right p{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 40px;

}
.box .right .price{
  display: flex;
}
.box .right .price span{
  flex: 1;
  vertical-align: bottom;
  margin-right: 20px;
  color: red;
  margin-top: 5px;
}
/* 数量框 */
.count-box{
    width: 100px;
    display: flex;
}
.add, .mins{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
}
.inp{
    text-align: center;
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
}
.van-submit-bar{
  margin-bottom: 50px;
  border-bottom: 1px solid gray;
}
.disable{
  background-color: #ff9779;
}
.empty {
text-align: center;
margin-top: 150px;
}
.empty img{
  height: 100px;
  width: 150px;
}
.empty .kong{
  color: gray;
  margin-top: 20px;
}
.empty p{
  text-align: center;
  height: 30px;
  background-color: red;
  border-radius: 20px;
  width: 120px;
  line-height: 30px;
  color: white;
  margin-top: 20px;
  margin-left: 120px;
}
</style>