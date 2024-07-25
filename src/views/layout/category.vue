 <template>
  <div>
    <div class="header">
      <van-nav-bar title="全部分类" @click-left="$router.go(-1)" />
      <van-search shape="round" placeholder="请输入搜索关键词" @click="$router.replace('/search')"></van-search>
    </div>
    <div class="contains">
      <div class="left">
        <div class="leftscroll">
          <ul>
            <li v-for="(item,index) in leftList" :key="item.category_id">
              <a href="javascript:;" :class="{active:index===activeIndex}" @click="activeIndex=index">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="rightitem" @click="$router.push(`/searchlist?categoryId=${item.category_id}`)" v-for="item in leftList[activeIndex]?.children" :key="item.category_id">
          <img :src="item.image?.external_url" alt="">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCategoryData} from '../../api/category'
export default {
  name:'categoryIndex',
  data () {
    return {
      leftList:[],
      rightList:[],
      activeIndex:0
    }
  },
  async created () {
   const res = await getCategoryData()
   this.leftList = res.data.list
   console.log(this.leftList);
  }
};
</script>

<style scoped>
.header .van-search {
  background-color: rgba(128, 128, 128, 0.292);
}
.contains {
  display: flex;
  height: 520px;
}
.left {
  flex: 1;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.292);
  overflow: scroll;
}
.left .leftscroll a {
  display: block;
  height: 55px;
  line-height: 55px;
  width: 100%;
  color: black;
  text-align: center;
}
.left .leftscroll .active {
  color: #fb442f;
          background-color: #fff;
}
.right {
   flex: 3;
  display: flex;
  justify-content: flex-start;
  background-color: aqua;
  flex-wrap: wrap;
  height: 0;
}
.right .rightitem{
  height: 100px;
  text-align: center;
  margin-left: 15px;
}
.right div img{
      width: 70px;
     height: 70px;
     display: block;
      margin: 5px auto;
}
</style>