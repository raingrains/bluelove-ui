<template>
<!-- transition   vue中的动画效果 -->
  <transition name="dialog-fade">
    <!-- 对话框的遮罩层  .self代表只有点击自己才能触发，点击其子元素不能触发 -->
    <!-- @click.self避免冒泡，只有点击自己时才能触发   -->
    <div class="hm-dialog__wrapper" v-show="visible" @click.self="handleClose">
      <div class="hm-dialog" :style="{width,marginTop:top}">
        <div class="hm-dialog__header">
          <!-- 将span放到slot内，这样不仅可以定义title文本，还可以定义样式等 -->
          <slot name="title">
            <span class="hm-dialog__title">{{title}}</span>
          </slot>
          <button class="hm-dialog__headerbtn">
            <i class="hm-icon-close" @click="handleClose"></i>
          </button>
        </div>
        <div class="hm-dialog__body">
          <!-- 内容可能是除span以外的其他内容，比如列表等，所以在这里使用插槽，并且不规定插槽内具体的标签 -->
          <!-- 并且在这里使用匿名插槽，使用匿名插槽的好处就是不用指定名称，这样在不使用<template v-slot>指定插槽内容的时候，也可以自定义内容 -->
          <slot></slot>
        </div>
        <!-- 如果footer不传递内容，则不显示footer -->
        <div class="hm-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "HmDialog",
  props: {
    title: {
      type: String,
      default: "提示"
    },
    width: {
      type: String,
      default: "50%"
    },
    top: {
      type: String,
      default: "15vh"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      // console.log('haha')
      // 如何使用sync修饰符  自定义指令的时候使用update:(props值)
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="scss" scoped>
// scoped会给当前组件的模板中的所有元素都添加一个随机的属性
// scoped会给当前组件的样式页中添加一个对应的属性选择器
.hm-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0, 0, 0, 0.5);
  .hm-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    &__header {
      padding: 20px 20px 10px;
      position: relative;
      .hm-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .hm-dialog__headerbtn {
        position: absolute;
        top: 50%;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .hm-icon-close {
          color: 909399;
        }
      }
    }
    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      // 深度选择器 scss中的写法::v-deep  less中的写法 /deep/   css中的写法 >>>
      ::v-deep .hm-button:first-child {
        margin-right: 20px;
      }
    }
  }
}
.dialog-fade-enter-active{
  animation: fade .3s;
}
.dialog-fade-leave-active{
  animation: fade .3s reverse;
}
@keyframes fade{
  0%{opacity: 0;transform: translateY(-20px);}
  100%{opacity: 1;transform: translateY(0px);}
}
</style>