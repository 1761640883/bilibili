<template>
    <div id="main">
        <headerTitle title="注册bilibili">
            <div slot="right" @click="$router.push('/mine/login')">切换到登录</div>
        </headerTitle>
        <loginText class="name" label="姓名" type="text" placeholder="请输入姓名" @inputChange="ev => model.name = ev"/>
        <loginText label="账号" type="text" placeholder="请输入账号" @inputChange="ev => model.username = ev"/>
        <loginText label="密码" type="password" placeholder="请输入密码" @inputChange="ev => model.password = ev"/>
        <mine-btn btntext="注册" @registerSubmit="registerSubmit"/>
    </div>
</template>

<script>
import headerTitle from '@/components/header'
import LoginText from '@/components/LoginText'
import MineBtn from '@/components/MineBtn'

export default {
    name: 'Registered',
    components: {
        headerTitle,
        LoginText,
        MineBtn
    },
    data(){
        return {
            model: {
                name: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async registerSubmit(){
            let rulg = /^.{6,18}$/
            if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){
                const res = await this.$http.post('/register', this.model)/* .then(res=>{
                    console.log(res)
                }) */
                // console.log(res)// 变为同步，通过res获取返回值
                // console.log("我是第二次执行")
                this.$Modal.info({
                    title: '提示',
                    content: `<p>${res.data.msg}</p>`
                });
                if(res.data.code == 200){
                    localStorage.setItem('id', res.data.id)
                    localStorage.setItem('token', res.data.objtoken)
                    setTimeout(()=>{
                        this.$router.push('/mine/userinfo')
                    }, 1000)
                }
            }else{
                this.$Modal.warning({
                    title: '警告',
                    content: '<p>格式不正确，请重新输入</p>'
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #main{
        background: #f4f4f4;
        .name{
            margin: 0.15rem 0;
        }
    }
</style>