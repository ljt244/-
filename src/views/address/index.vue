<template>
  <div>
    <van-nav-bar
  title="收货地址"
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
import {getAddressList} from '@/api/address'
export default {
name:'AddressIndex',
data () {
    return {
      chosenAddressId: '1',
      list: []
    }
  },
  created () {
    this.getAddressListt()
  },
  methods: {
    onAdd () {
      Toast('新增地址')
      this.$router.replace('/shouhuoaddress')
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index)
    },
    async getAddressListt () {
    const {data:{list}} = await getAddressList()
    this.list = list
    console.log(list);
    this.list.forEach(item => {
        item.id = item.address_id
        item.tel = item.phone
        item.address = item.region.province + item.region.city + item.region.region + item.detail
    });
    console.log(this.list);
    }
  }
}
</script>

<style>

</style>