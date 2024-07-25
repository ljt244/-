export default {
    methods: {
     loginConfirm () {
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
        }
     }
    }
}