<template>
    <div>
      <van-nav-bar title="商品列表" left-arrow @click-left="$router.go(-1)"/>  
      <div class="search">
        <div class="left">
      <van-search shape="round" :value="querySearch || '搜索商品'" placeholder="请输入搜索关键词" @click="$router.push('/search')"></van-search>
    </div>
    <div class="right">
      <van-icon size="25px" name="list-switching" />
    </div>
      </div>
      <div class="bottom">
        <span>综合</span>
        <span>销量</span>
        <span>价格</span>

      </div>
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
    
  </template>
  
  <script>
import {getProlist} from '../../api/product'
import GoodsItem from '../../components/GoodsItem.vue'
  export default {
  name:'SearchlistIndex',
  components:{
    GoodsItem
  },
  data () {
    return {
      page:1,
      proList:[]
    }
  },
  computed: {
querySearch () {
  return this.$route.query.search
}
  },
 async created () {
   const res = await getProlist({
    categoryId:this.$route.query.categoryId,
    goodsName:this.querySearch,
    page:this.page
   })
this.proList = res.data.list.data
  }
  }
  </script>
  
  <style scoped>
  .search{
    display: flex;
  }
  .search .van-search
  {
    padding: 0;
    border-radius: 10px;
  }
  .search .left{
    flex: 7;
    padding-left: 16px;
  }
  .search .right{
    flex: 1;
    padding-top: 5px;
    padding-left: 5px;
  }
  .bottom{
    display: flex;
    justify-content: space-around;
    padding-left: 36px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  .bottom span{
    flex: 1;
  }
  </style>