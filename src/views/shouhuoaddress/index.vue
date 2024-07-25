<template>
    
    <div>
        <van-nav-bar
  title="收获地址"
  left-arrow
  @click-left="$router.go(-1)"
/>
        <van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
/>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { getaddress} from '@/api/shouhuoaddress'
export default {
    name:'ShouhuoIndex',
    async created () {
        const res = await getaddress('/address')
        console.log(res);
        this.list = res.data
    },
  data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  methods: {
    onAdd () {
      Toast('新增地址');
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index);
    }
  }
}
</script>

<style>

</style>