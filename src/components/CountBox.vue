<template>
    <div class="count-box">
<button class="mins" @click="decrease">-</button>
  <input type="text" @change="handlechange" class="inp" :value="value">
  <button class="add" @click="add">+</button>
    </div>
  
</template>

<script>
export default {
props:{
    value:{
        type:Number,
        default:1
    }
},
methods:{
    decrease () {
        if (this.value <= 1) {
return
        }
this.$emit('input',this.value - 1)
    },
    add () {
        this.$emit('input',(+this.value) + 1)
    },
    handlechange (e) {
        const num = e.target.value
        if (isNaN(num) || num < 1) {
            e.target.value = this.value
            return
        }
        this.$emit('input',+num)
    }
}
}
</script>

<style scoped>
.count-box{
    width: 100px;
    display: flex;
}
.add, .mins{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
}
.inp{
    text-align: center;
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
}
</style>