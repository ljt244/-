<template>
    <div class="login">
       
        <div class="contain">
          <van-nav-bar title="会员中心" left-arrow @click-left="$router.go(-1)"/>
          <div class="bigbox">
            <div class="box">
          <ul>
            <li><input type="text" v-model="mobile" placeholder="请输入手机号码"></li>
            <li><input v-model="picCode"
               type="text"
                placeholder="请输入图形验证码">
                <img v-if="picUrl" :src="picUrl" @click="this.getPicCode" alt=""></li>
            <li><input type="text" v-model="msgCode"   placeholder="请输入短信验证码"> <button @click="getCode">{{second === totalsecond ?'获取验证码':second+'秒后重新发送'}}</button></li>
          </ul>
         </div>
         <div class="footer">
          <button @click="login">登录</button>
         </div>
          </div>
         
        </div>
    </div>
  </template>
  
  <script>
  import {codeLogin, getmMsgCode, getPicCode} from '../../api/login'
  export default {
  name:'LoginIndex',
  data () {
    return {
      mobile:'',// 手机号
      picCode:'',// 用户输入的图形验证码
      picKey:'',// 将来请求传递的图形验证码唯一标识
      picUrl:'',// 存储请求渲染的图片地址
      totalsecond:60,
      second:60,
      msgCode:'',// 短信验证码
      timer:null
    }
  },
    async created () {
      this.getPicCode()
   },
  methods:{
    async getPicCode () {
     const {data:{base64,key}} = await getPicCode()
   this.picUrl = base64 // 存储地址
   this.picKey = key // 存储唯一标识
    },
    // 校验手机号和图形验证码是否合法
    // 通过返回true
    // 不通过返回false
    valiFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false 
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    }, 
    // 获取验证码点击事件
   async getCode () { 
      if (!this.valiFn()) {
        // 校验过程，如果没通过就没必要往下运行了
        return
      }
      // 如果秒数和总时间相等则执行
      if (!this.timer && this.second === this.totalsecond) {
        // 获取短信验证码接口
        await getmMsgCode(this.picCode,this.picKey,this.mobile)  
        this.$toast('获取验证码成功,默认为[246810]');
      this.timer = setInterval(() => {
        this.second--
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.timer = null
          this.second = this.totalsecond
        }
      }, 1000);
     }
    },
    // 登录功能
 async login () {
  // 校验功能
  if (!this.valiFn()) {
    return
  }
  // 短信验证码格式校验
  if (!/^\d{6}$/.test(this.msgCode)) {
    this.$toast('输入短信验证码错误')
    return
  }
  const res = await codeLogin(this.mobile,this.msgCode)
  this.$store.commit('user/setUserInfo',res.data)
 console.log(res);
 this.$toast('登录成功')
 const url = this.$route.query.backurl || '/'
 this.$router.replace(url)
}
   },
   destroyed () {
    // 离开页面清除定时器
    clearInterval(this.timer)
   }
  }
  </script>
  
  <style scoped>
  html{
    height: 100%;
  }
  body{
background: url('../../assets/background.png') no-repeat ;
background-size: 100% 100%; 

}
  .contain{
    height: 100%;

  }
  .bigbox{
    margin-left: 30px;
margin-right: 30px;
  }
  .contain .van-nav-bar{
    background: none;
    
  }

  .contain h1{
font-weight: 400;
color: rgb(42, 165, 120);
  }
  .contain p{
    margin-top: 10px;
    margin-bottom: 25px;
    opacity: .3;
    color:  rgb(43, 168, 226);
  }
  .contain .box{
    margin-top: 150px;
  }
  .contain .box input{
    background: none;
    padding-left: 10px;
    width: 100%;
    height: 50px;
    border: 0;
    margin-top: 15px;
    border-bottom: 1px solid gray;
    border-radius: 15px;
    
  }
  .contain .box input:focus{
    border-bottom:2px solid rgb(43, 168, 226);
  }
  .contain .box input::placeholder{
    color: rgb(206, 196, 255);
  }
  .contain .box li{
    position: relative;
  }
  .contain .box li button{
    position: absolute;
    color: orange;
    background: none;
    border: 0;
    top: 50%;
    right: 5px;
  }
  .contain .box li img{
    position: absolute;
   height: 36px;
    width: 96px;
    right: 10px;
    bottom: 5px;
border-radius: 10px;
  }
  .contain .footer button{
    margin-top: 50px;
    width: 100%;
    height: 40px;
    background-color: orange;
    color: white;
    text-align: center;
    line-height: 40px;
    border: 0;
    border-radius: 30px;
  }
  </style>