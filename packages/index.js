// 整个包的入口
// 定义一个install方法，接受Vue作为参数。如果使用use注册插件，则所有的组件都会被注册
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Switch from './switch'
import Radio from './radio'
import RadioGroup from './radio-group'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import FormItem from './form-item'
import Form from './form'
import './fonts/iconfont.css'

const components =[
    Button,
    Dialog,
    Input,
    Switch,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    FormItem,
    Form
]
const install = function(Vue){
    // 遍历注册全局组件
    components.forEach(item => {
        Vue.component(item.name,item)
    })
}
// 判断文件是否是直接引入文件，如果是，就不调用Vue.use
if(typeof window !== 'undefined' && window.Vue){
    install(window.Vue)
}

export default {
    install
}