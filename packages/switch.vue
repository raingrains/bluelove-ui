<template>
  <div class='hm-switch' @click="handleClick" :class="{'is-checked':value}">
      <span class="hm-switch__core" ref="core">
          <span class="hm-switch__button"></span>
      </span>
      <input type="checkbox" :name='name' class="hm-switch__input" ref="input">
  </div>
</template>

<script>
export default {
    name:'HmSwitch',
    props:{
        value:{
            type:Boolean,
            default:false
        },
        activeColor:{
            type:String,
            default:''
        },
        inactiveColor:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:''
        }
    },
    methods:{
        setColor(){
            // 修改开关的颜色
            if(this.activeColor || this.inactiveColor){
                let color=this.value ? this.activeColor : this.inactiveColor
                this.$refs.core.style.borderColor = color
                this.$refs.core.style.backgroundColor = color
            }
        },
        async handleClick(){
            this.$emit('input',!this.value)
            // 点击的时候，还需要改变背景色
            // console.log(this.value)
            // 等待value发生了改变，在setColor
            // 数据发生改变后，等待DOM更新，在修改按钮颜色
            /**
             * Vue.nextTick([callback,content]),即this.$nextTick()
             * 用法：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
             *       在2.1.0版本更新之后，如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise
             */
            await this.$nextTick()
            this.setColor()
            this.$refs.input.checked= this.value
        }
    },
    mounted(){
        // 修改开关的颜色
        this.setColor()
        // 控制checkbox的checked
        this.$refs.input.checked= this.value
    }
}
</script>

<style lang='scss' scoped>
.hm-switch{
    display: inline-flex;
    align-items: center;
    position: relative;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    vertical-align: middle;
    .hm-switch__input{
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
    }
    .hm-switch__core{
        margin: 0;
        display: inline-block;
        position: relative;
        width: 40px;
        height: 20px;
        border: 1px solid #dcdfe6;
        outline: none;
        border-radius: 10px;
        box-sizing: border-box;
        background: #dcdfe6;
        cursor: pointer;
        transition: border-color .3s background-color .3s;
        vertical-align: middle;
        .hm-switch__button{
            position: absolute;
            top: 1px;
            left: 1px;
            border-radius: 50%;
            transition: all .3s;
            width: 16px;
            height: 16px;
            background-color: #FFF;
        }
    }
}
.hm-switch.is-checked{
    .hm-switch__core{
        border-color:#409eff;
        background-color: #409eff;
        .hm-switch__button{
            transform: translateX(20px);
        }
    }
}
</style>