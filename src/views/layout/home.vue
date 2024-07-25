<template>
  <div class="box">
    <div class="header">
      <h3>电子产品商城</h3>
      <!-- 15751776629 -->
      <router-link to="./login" class="homelogin">登录</router-link>
      <van-search v-model="value" placeholder="请输入搜索关键词" @click="$router.replace('/search')"/>
    </div>
    <div class="contains">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
      <van-swipe-item >
        <img src="../../assets/背景图1.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item >
        <img src="../../assets/背景图2.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item >
        <img src="../../assets/背景图3.jpg.avif" alt="">
      </van-swipe-item>
      </van-swipe>
      <div class="small">
       <!-- 导航 -->
<van-grid column-num="5" icon-size="40">
  <van-grid-item
    v-for="item in navList" :key="item.imgUrl"
    :icon="item.imgUrl"
    :text="item.text"
    @click="$router.push('/category')"
  />
</van-grid>
      </div>
      <div class="main">
        <img src="../../assets/main.jpg" alt="" style="">
      </div>
      <div class="guess">
        <p>--猜你喜欢--</p>
      </div>
      <!-- 商品列表 -->
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>
  
  <script>
    import GoodsItem from '../../components/GoodsItem.vue';
    import {getHomeData,getData} from '../../api/home'
export default {
  name:'homeIndex',
  data () {
    return {
      value:'',
      bannerList: [], // 轮播
      navList: [], // 导航
      proList: [], // 商品
      data:[]
    }
  },
  async created () {
    const res = await getHomeData()
    console.log(res);
    this.bannerList = res.data.pageData.items[1].data
    this.navList = res.data.pageData.items[3].data
    console.log(this.navList);
    this.proList = res.data.pageData.items[6].data
  },
  components:{
    GoodsItem
  },
  async mounted () {
    const res = await getData()
    console.log(res);
  }
};
</script>
  
  <style scoped>
.box {
  overflow: scroll;
  background-color: rgba(128, 128, 128, 0.083);
}
.box .header{
position: fixed;
width: 100%;
top: 0;
left: 0;
z-index: 999;
}
.homelogin{
  position: absolute;
  top: 12px;
  right: 20px;
  color: #fff;
  font-style: italic;
}
.box .header h3 {
  width: 100%;
  height: 45px;
  background-color: rgb(0, 140, 255);
  line-height: 45px;
  color: white;
  text-align: center;
}
.box .header input {
  margin-left: 15px;
  width: 95%;
  height: 35px;
  border-radius: 15px;
  margin-top: 9px;
  border: 0;
}
.contains{
  margin-top: 100px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe img{
width: 100%;
height: 100%;
}
.van-swipe-item{
  height: 184px;
}
.small ul{
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding-bottom: 25px;
}
.small li{
  flex: 0 0 20%;
 text-align: center;
 margin-top: 25px;
}
/* 索引第六到第十个孩子 */
.small li:nth-child(n+6):nth-child(-n+10){
  margin-top: 30px;
}
.small li p{
  color: black;
  font-size: 13px;
}
.main{
  height: 190px;
}
.main img{
  width: 100%;
  height: 100%;
}
.guess p{
  text-align: center;
  height: 50px;
  line-height: 50px;
}
</style>