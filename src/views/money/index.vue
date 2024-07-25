<template>
  <div class="root">
        <div class="header">
           <div class="left">
            <p>余额</p>
            <p>{{ money }}</p>
            <p>查看余额明细</p>
           </div>
           <div class="right">
            <p>红包</p>
            <p>{{ hongbao }}</p>
            <p>查看红包明细</p>
           </div>
        </div>
        <div class="bottom">
            <ul>
                <li><p>2</p><span>优惠券</span></li>
                <li><p>0</p><span>礼品卡</span></li>
                <li><p>1</p><span>银行卡</span></li>
                <li><p>0</p><span>膨胀金</span></li>
                <li><p>13765</p><span>积分</span></li>
            </ul>
           </div>
           <div>
            <button @click="$router.go(-1)">返回</button>
           </div>
  </div>
</template>

<script>
import {getmoney} from '@/api/money'
export default {
name:'MoneyIndex',
data () {
    return {
money:'1',
hongbao:'2'
    }
},
 async created () {
   const res = await getmoney()
   console.log(res);
   this.money = res.data[0].money
   this.hongbao = res.data[0].hongbao
}
}
</script>

<style lang="less" scoped>
.root{
    padding: 35px 10px 0 10px;
    background: url('@/assets/moneybg.png') no-repeat;
    background-size: 100% 100%;
    height: 667px;
}
.header{
    height: 75px;
    display: flex;
    .left{
   flex: 1;
    }
    .right{
        flex: 1;
    }
}
.bottom{
    text-align: center;
    height: 42px;
    border-top: 1px solid gray;
    li{
        float: left;
        margin: 3px 10px 3px 10px;
    }
}
button{
    margin-left: 120px;
    margin-top: 75px;
background-color: rgba(0, 162, 255, 0.514);
height: 45px;
width: 138px;
border: 0;
text-align: center;
line-height: 25px;
border-radius: 10px;
}
</style>