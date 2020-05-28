<template>
  <div class="hm-radio-group">
      <slot></slot>
  </div>
</template>

<script>
export default {
    name:"HmRadioGroup",
    provide(){
        return{
            RadioGroup: this
        }
    },
    props:{
        // hm-radio-group 接收到了value值
        // 将来还需要触发当前组件的input事件
        // provide 与 inject
        value:null
    }
}
</script>

<style>

</style>