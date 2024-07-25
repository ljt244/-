<template>
  <div>
    <van-nav-bar title="商品详情页" left-arrow @click-left="$router.go(-1)" />
    <van-swipe
      @change="onChange"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img :src="image.external_url" alt="" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{images.length}}</div>
      </template>
    </van-swipe>

    <div class="contains">
      <div>
        <p class="price">
          <span class="newprice">￥{{ prodetail.goods_price_min }}</span>
          <span class="oldprice">￥{{ prodetail.goods_price_max }}</span>
          <span class="sale">已售{{ prodetail.goods_sales}}件</span>
        </p>
      </div>
      <div class="texttitle">
        <p>{{ prodetail.goods_name }} </p>
      </div>
      <p class="tip">
        <van-icon color="red" name="certificate" />七天无理由退货
        <van-icon color="red" name="certificate" />48小时发货
        <van-icon class="right" name="arrow" />
      </p>
      <div class="rate">
        <p>
          <span>商品评价（5条）</span>
          <span>查看更多<van-icon name="arrow" /></span>
        </p>
        <div class="row" v-for="(item,index) in comments" :key="index">
          <div class="toprow">
         <img :src=item.user.avatar_url alt="">          
  <span class="name">{{item.user.nick_name}}</span>
            <van-rate
              class="name"
              v-model="value"
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="bottomrow">
            <p>{{item.content}}</p>
            <p>{{item.create_time}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-html="prodetail.content" class="desc">

    </div>
    <!-- 底部导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="wap-home-o" text="首页" color="#ee0a24" @click="$router.push('/')" />
        <van-goods-action-icon  icon="cart-o" text="购物车"  :badge="cartTotal > 0 ? cartTotal:''" @click="$router.push('/cart')" />
      <van-goods-action-button @click="addFn" type="warning" text="加入购物车" />
      <van-goods-action-button @click="buyFn" type="danger" text="立即购买" />
    </van-goods-action>
    <!-- 加入购物车的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立刻购买'">
  <div class="product">
    <div class="product-title">
      <div class="left">
        <img :src="prodetail.goods_image" alt="">
      </div>
      <div class="right">
        <div class="price">
          <span>¥</span>
          <span class="nowprice">{{ prodetail.goods_price_min }}</span>
        </div>
        <div class="count">
          <span>库存</span>
          <span>{{ prodetail.stock_total }}</span>
        </div>
      </div>
    </div>
    <div class="num-box">
      <span>数量</span>
      <CountBox v-model="addCount"></CountBox>
    </div>
    <div class="showbtn" v-if="prodetail.stock_total>0">
      <div class="btn" v-if="mode==='cart'" @click="addcart">加入购物车</div>
      <div class="btn now" v-else @click="buyrightnow">立刻购买</div>
    </div>
    <div class="btn-none" v-else>该商品已抢完</div>
  </div>
</van-action-sheet>

  </div>
</template>
  
  <script>
  import CountBox from '../../components/CountBox.vue';
  import { getProComments,getProDetail } from '../../api/product'
  import { addCart } from '../../api/cart'
export default {
  name: 'DetailIndex',
  components:{
    CountBox
  },
  data () {
    return {
      current: 0,
      value: 5,
      prodetail:{},
      comments:[],
      images:[],
      showPannel:false,
      mode:'cart',
      addCount:1,
      cartTotal:0
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  created () {
this.getDetail()
this.getComments()
},
  methods: {
    onChange (index) {
      this.current = index
    },
    async getDetail () {
     const {data:{detail}} = await getProDetail(this.goodsId)
     this.prodetail = detail
     this.images = detail.goods_images
     console.log(this.prodetail);
    },
    async getComments () {
     const res = await getProComments(this.goodsId,5)
     this.comments = res.data.list
    },
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buyNow'
      this.showPannel = true
    },
   async addcart () {
    const local = JSON.parse(localStorage.getItem('hm_shopping_info')) || ''
      if (!local.token) {
        console.log(111);
        this.$dialog.confirm({
  title: '温馨提示',
  message: '此时需要先登录才能继续操作',
  confirmButtonText:'去登录',
  cancelButtonText:'取消'
})
  .then(() => {
    // on confirm
    this.$router.replace({
      path:'/login',
      query:{
        backurl:this.$route.fullPath
      }
    })
  })
  .catch(() => {
    // on cancel
  });
               return
      }
      const res = await addCart(this.goodsId,this.addCount,this.prodetail.skuList[0].goods_sku_id)
      console.log(res);
      this.cartTotal = res.data.cartTotal
      this.$toast('加入购物车成功')
      this.showPannel = false
    },
    buyrightnow () {
      const local = JSON.parse(localStorage.getItem('hm_shopping_info')) || ''
      if (!local.token) {
        console.log(111);
        this.$dialog.confirm({
  title: '温馨提示',
  message: '此时需要先登录才能继续操作',
  confirmButtonText:'去登录',
  cancelButtonText:'取消'
})
  .then(() => {
    // on confirm
    this.$router.replace({
      path:'/login',
      query:{
        backurl:this.$route.fullPath
      }
    })
  })
  .catch(() => {
    // on cancel
  });
               return
      }
     this.$router.push({
      path:'/pay',
      query:{
        mode: 'buyNow',
        goodsId:this.goodsId,
        goodsNum:this.addCount,
        goodsSkuId:this.prodetail.skuList[0].goods_sku_id
      }
     })
    }
  }
};
</script>
  
  <style lang="less" scoped>
.my-swipe .van-swipe-item {
  height: 374px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-goods-action-icon {
position: relative;
}
.van-goods-action-icon span{
position: absolute;
top: -2px;
right: 0;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.my-swipe .van-swipe-item img {
  width: 100%;
}
.contains {
  padding: 8px;
}
.newprice {
  color: red;
  font-size: 22px;
}
.oldprice {
  color: gray;
  text-decoration: line-through;
  font-size: 15px;
}
.price{
  position: relative;
}
.sale {
  position: absolute;
  color: gray;
  font-size: 15px;
  right: 10px;
}
.texttitle p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.tip {
  position: relative;
  padding-left: 10px;
  height: 35px;
  line-height: 35px;
  background-color: rgba(128, 128, 128, 0.044);
  margin: 12px 0;
}
.right {
  position: absolute;
  right: 37vw;
  top: 15vw;
}
.rate p {
  position: relative;
}
.rate p span:nth-child(1) {
  font-size: 15px;
}
.rate p span:nth-child(2) {
  position: absolute;
  font-size: 15px;
  right: 5px;
  color: rgba(128, 128, 128, 0.782);
}
.row {
  margin: 15px 0;
}
.row .toprow {
  height: 18px;
  line-height: 18px;
}
.row .toprow img{
  height: 18px;
  width: 18px;
}
.row .name {
  vertical-align: top;
  margin: 0 5px;
}
.bottomrow p:nth-child(1) {
  margin: 8px 0 15px 0;
}
.bottomrow p:nth-child(2) {
  color: rgba(128, 128, 128, 0.721);
}
   .desc ::v-deep img {
      display: block;
      width: 100%!important;
    }
    // 加入购物车弹c层
    .product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}
</style>