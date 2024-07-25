<template>
    <div>
      <van-nav-bar
  title="订单结算页"
  left-arrow
  @click-left="$router.go(-1)"
/> 
<div class="dizhi" @click="$router.push('/address')">
  <div class="left"><van-icon name="logistics" /></div>
  <div class="right">
    <div class="xianxidizhi">
      <div class="top">{{selectAddress.name}}{{ selectAddress.phone }}</div>
      <div class="bottom">{{longAddress}}<span><van-icon name="arrow" /></span></div>
    </div>
  </div>
</div>
<div class="borderline"></div>
<!-- 商品介绍 -->
<div class="bigproduct" v-if="order.goodsList">
  <div class="topproduct" v-for="item in order.goodsList" :key="item.goods_id">
<div class="left">
  <img :src=item.goods_image alt="">
</div>
<div class="right">
  <div class="top">{{item.goods_name}} </div>
  <div class="bottom">
    <span>×{{ item.total_num }}</span><span class="danjia">￥{{ item.goods_price_max }}</span>
  </div>
</div>
</div>
<div class="bottomproduct">
<span>共{{order.orderTotalNum}}件商品</span>
合计：<span style="color: rgba(255, 0, 0, 0.778);">￥{{ order.orderTotalPrice }}</span>
</div>
</div>
<!-- 订单金额 -->
<div class="money">
<div class="totalmoney"><span>订单总金额：</span><span class="dingwei" style="color: rgba(255, 0, 0, 0.778);">￥{{ order.orderTotalPrice }}</span></div>
<div class="youhui"><span>优惠券：</span><span class="dingwei">无优惠券可用</span></div>
<div class="yunfei"><span>配送费用：</span><span class="dingwei" style="color: rgba(255, 0, 0, 0.778);">+￥0.00</span></div>
</div>
<!-- 支付方式 -->
<div class="way">
  <div class="payway">支付方式</div>
  <div class="div">
    <span><van-icon name="balance-o" color="orange" size="20"/>余额支付(可用￥{{ detail.pay_money || 0 }})</span>
    <van-icon name="certificate" color="orange" size="20" class="youce"/>
  </div>
</div>
<!-- 留言列表 -->
<div class="liuyan">
  <input type="text" name="" id="" v-model="remark" placeholder="选填：买家留言">
</div>
<!-- 底部提交栏 -->
<van-submit-bar :price=order.orderTotalPrice*100 @submit="submitorder" button-text="提交订单"  />
   </div>
  </template>
  
  <script>
  import { getAddressList } from '@/api/address'
  import { getUserInfoDetail } from '@/api/user.js'
import { checkOrder,submitOrder } from '@/api/order'
  export default {
  name:'PayIndex',
  data () {
    return {
      order:{},
      personal:{},
      remark:'',
      addressList:[],
      detail:{}
    }
  },
  methods: {
    async getAddressList () {
    const {data:{list}} = await getAddressList()
    this.addressList = list
    console.log(list);
    },
    async getUserInfoDetail () {
      const { data: { userInfo } } = await getUserInfoDetail()
      this.detail = userInfo
      console.log(this.detail)
    },
    async getOrderList () {
      if (this.mode === 'cart') {
         const {data:{order,personal}} = await checkOrder(this.mode,{
  cartIds:this.cartIds
})
this.order = order
 this.personal = personal
 console.log(this.personal);
      }
      if (this.mode === 'buyNow') {
        console.log(111);
        const {data:{order,personal}} = await checkOrder(this.mode,{
  goodsId:this.goodsId,
  goodsNum:this.goodsNum,
  goodsSkuId:this.goodsSkuId
})
 this.order = order
 this.personal = personal
 this.personal.balance = '99999999'
 console.log(this.personal);
      }
  },
  async submitorder () {
    if (this.mode === 'cart') {
      await submitOrder(this.mode,{
      remark:this.remark,
      cartIds:this.cartIds
      }) 
        this.$toast('支付成功')
    this.$router.replace('/myorder')
    }
    if (this.mode === 'buyNow') {
      await submitOrder(this.mode,{
      remark:this.remark,
      goodsId:this.goodsId,
  goodsNum:this.goodsNum,
  goodsSkuId:this.goodsSkuId
      })
      this.$toast('支付成功')
    this.$router.replace('/myorder')
    }
  }
},
  computed: {
    selectAddress () {
      return this.addressList[0] || {}
    },
    longAddress () {
const region = this.selectAddress.region
return region.province + region.city + region.region + this.selectAddress.detail
    },
    mode () {
 return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    }
  },
 async created () {
this.getAddressList()
this.getOrderList()
      this.getUserInfoDetail()
  }
}
</script>
  <style scoped>
  .dizhi{
    margin-top: 30px;
  }
  .dizhi .left{
    float: left;
    height: 55px;
    width: 75px;
    text-align: center;
    line-height: 55px;
  }
  .dizhi .right{
    position: relative;
    float: left;
    height: 55px;
    width: 300px;
  }
  .dizhi .right span{
    position: absolute;
    right: 10px;
  }
  .borderline{
    clear: both;
    height: 5px;
    width: 375px;
    background: url('../../assets/border-line.png') ;
    background-size: contain;
  }
  /* 商品介绍 */
  .bigproduct{
    display: flex;
    flex-direction: column;
    padding: 15px 7px;
    border-bottom: 1px solid rgba(128, 128, 128, 0.458);
    margin-top: 5px;
    overflow: hidden;
  }
  .topproduct{
    flex: 8;
    display: flex;
    clear: both;
    
    
  }
  .topproduct .left{
    flex: 1;
  }
  .topproduct .left img{
    height: 100%;
    width: 100%;
  }
  .topproduct .right{
    flex: 3;
  }
  .topproduct .right .top{
    overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  }
  .topproduct .right .bottom{
    position: relative;
    height: 45px;
    line-height: 65px;
  }
  .topproduct .right .bottom .danjia{
    position: absolute;
    right: 5px;
    font-size: 15px;
    color: rgba(255, 0, 0, 0.778);
  }
  .bottomproduct{
    box-sizing: border-box;
    flex: 1;
    text-align: right;
    height: 15px;
  }
  /* 订单金额 */
.money{
  height: 110px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.458);
}
.totalmoney,.yunfei,.youhui{
  position: relative;
  margin-top: 15px;
  color: gray;
}
.dingwei{
  position: absolute;
  right: 5px;
}
.way{
  position: relative;
  padding: 10px 10px;
  height: 90px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.458);
}
.payway{
  margin-bottom: 20px;
}
.way span{
  padding-left: 15px;
}
.way .youce{
  position: absolute;
  right: 5px;
}
.liuyan{
  padding: 10px 10px;
}
.liuyan input{
  height: 250px;
  width: 350px;
  border: 0;
  padding-bottom: 230px;
}
  </style>