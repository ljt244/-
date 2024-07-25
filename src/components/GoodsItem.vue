<template>
   <div class="box" v-if="item.goods_id" @click="$router.push(`/prodetail/${item.goods_id}`)">
    <div class="left">
        <img :src="item.goods_image" alt="">
    </div>
        <div class="right">
            <span class="title">{{item.goods_name}}</span>     
            <p>已售{{item.goods_sales}}件</p>
            <span class="newprice">￥{{item.goods_price_min}}</span> <span class="oldprice">{{ item.goods_price_max}}</span>
           </div>
   </div>
  </template>
  
  <script>
  export default {
    name: 'GoodsItem',
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    mounted () {
      console.log(this.item);
    }
  }
  </script>
  
  <style lang="less" scoped>
  .box{
   display: flex;
padding: 5px;
  }
  .left{
 flex: 1;
  }
  .left img{
    width: 150px;
    height: 100%;
    vertical-align: top;

  }
 .right{
    flex: 2;
    margin-left: 5px;
 }
 .right .title{
    overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
 }
 .right p{
    color: gray;
    font-size: 12px;
    margin-top: 15px;
    margin-bottom: 15px;
 }
 .newprice{
    color: red;
    font-size: 18px;
 }
 .oldprice{
    color: gray;
    font-size: 13px;
    text-decoration: line-through;
 }
  </style>
  