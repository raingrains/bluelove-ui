<template>
    <div class="hm-input" :class="{'hm-input--suffix':showSuffix}">
        <!-- 如果传了show-password,判断是否需要切换密码的显示，如果不传，不判断 -->
        <input 
        :type="showPassword ? (passwordVisible? 'text' : 'password') : type" 
        class='hm-input__inner'
        :class="{'is-disabled':disabled}"
        :placeholder="placeholder"
        :name='name'
        :disabled='disabled'
        :value='value'
        @input='handleInput'
        >
         <span class="hm-input__suffix" v-if='showSuffix'>
            <i class="hm-input__icon hm-icon-cancel" v-if='clearable && value' @click='clear'></i>
            <i class="hm-input__icon hm-icon-visible" :class="{'hm-icon-visible-active':passwordVisible}" v-if="showPassword && type=='password'" @click="handlePassword"></i>
        </span>
    </div>
</template>
<script>
export default {
    name:'HmInput',
    data(){
        return{
            // 用于控制是否显示密码框
            passwordVisible:false
        }
    },
    props:{
        placeholder:{
            type:String,
            default:''
        },
        type:{
            type:String,
            default:'text'
        },
        name:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        },
        value:{
            type:String,
            default:''
        },
        clearable:{
            type:Boolean,
            default:false
        },
        showPassword:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        handleInput(e){
            this.$emit('input',e.target.value)
        },
        clear(){
            // 把内容清空
            this.$emit('input','')
        },
        handlePassword(){
            // 控制密码的显示与隐藏
            this.passwordVisible=!this.passwordVisible
        }
    },
    computed:{
        showSuffix(){
            return this.clearable||this.showPassword
        }
    }
}
</script>
<style lang="scss" scoped>
    .hm-input{
        width: 100%;
        position: relative;
        font-size: 14px;
        display: inline-block;
        .hm-input__inner{
            // 移出系统原生控件的默认样式
            -webkit-appearance: none;
            background-color: #FFF;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            width: 100%;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            &:focus{
                outline: none;
                border-color: #409eff;
            }
            &.is-disabled{
                background-color: #f5f7fa;
                border-color: #e4e7ed;
                color:#c0c4cc;
                cursor: not-allowed;
            }
        }
        
    }
     // 后面加suffix的意思是后面如果有后缀的话，触发该样式
.hm-input--suffix{
    .hm-input__inner{
        padding-right: 30px;
    }
    .hm-input__suffix{
        position: absolute;
        right: 10px;
        height: 100%;
        top: 0;
        line-height: 40px;
        text-align: center;
        color: #c0c4cc;
        transition: all .3s;
        z-index: 900;
        i{
        color: #c0c4cc;
        font-size: 16px;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
        }
        .hm-icon-visible-active{
            color:blue;
        }
    }
}
</style>