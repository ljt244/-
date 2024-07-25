<template>
    <div>
      <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>
      <div class="search">
        <div class="left">
          <van-search v-model="value" placeholder="请输入搜索关键词"></van-search>
        </div>
        <div class="right">
<button @click="goSearch(value)">搜索</button>
        </div>
        

      </div>
      <div class="recently">
        <div>
          <div class="top">
            <span>最近搜索</span>
            <van-icon @click="clear" title="清空历史" name="delete-o" />
          </div>
          <div class="bottom" v-if="history.length > 0">
            <button v-for="item in history" :key="item"  @click="goSearch(item)">{{ item }}</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // const HISTORYKEY = 'historykey'
  import { getHistoryList, setHistoryList} from '../../utils/storage'
  export default {
  name:'SearchIndex',
  data () {
    return {
      value:'',
      history:  getHistoryList()

    }
  },
   created () {
  //  const result = localStorage.getItem(HISTORYKEY)
  //  this.history = result ? JSON.parse(result) : []
  getHistoryList()
   },
  methods:{
    goSearch (value) {
       const index = this.history.indexOf(value)
       console.log(index);
       if (index !== -1) {
        this.value = ''
        this.history.splice(index,1)
        this.history.unshift(value)
        setHistoryList(this.history)
        // localStorage.setItem(HISTORYKEY,JSON.stringify(this.history))
        } else {
          this.value = ''
        this.history.unshift(value)
        setHistoryList(this.history)
        // localStorage.setItem(HISTORYKEY,JSON.stringify(this.history))
       }
       this.$router.push(`/searchlist?search=${value}`)
    },
    clear () {
      this.history = []
      setHistoryList([])
    }
  }
  }
  </script>
  
  <style scoped>
  .search{
    display: flex;
  }
  .left{
    flex: 4;
  }
  .right{
    flex: 1;
    text-align: center;
    padding-top: 10px;
  }
  .right button{
    height: 35px;
    width: 100%;
    background-color: red;
    color: white;
    font-size: 15px;
border: 0;
margin-right: 5px;
border-top-right-radius: 5px;
border-bottom-right-radius: 5px;
  }
  .van-search{
padding-right: 0; 
 }
 .recently{
  padding: 12px;
 }
 .recently .top{
  position: relative;
  margin-top: 7px;
  margin-bottom: 14px;
 }
 .recently .van-icon{
  position: absolute;
  right: 5px;
 }
 .bottom{
  display: flex;
  justify-content: space-arounds;
  flex-wrap: wrap;
 }
 .bottom button{
  text-align: center;
  line-height: 7px;
  height: 30px;
  width: 100px;
  background: none;
  border: 1px solid rgba(128, 128, 128, 0.223);
  border-radius: 20px;
  margin-right: 15px;
  margin-bottom: 15px;
 }
  </style>