<template>
    <div id="main">
        <headerTitle title="登录bilibili">
            <div slot="right" @click="$router.push('/mine/registered')">切换到注册</div>
        </headerTitle>
        <loginText label="账号" type="text" placeholder="请输入账号" @inputChange="ev => model.username = ev" class="input"/>
        <loginText label="密码" type="password" placeholder="请输入密码" @inputChange="ev => model.password = ev" class="input"/>
        <mine-btn btntext="登录" @registerSubmit="registerSubmit"/>
    </div>
</template>

<script>
import headerTitle from '@/components/header'
import LoginText from '@/components/LoginText'
import MineBtn from '@/components/MineBtn'

export default {
    name: 'login',
    components: {
        headerTitle,
        LoginText,
        MineBtn
    },
    data(){
        return {
            model: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async registerSubmit(){// 登录
                let rulg = /^.{6,18}$/
                if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)){// 登录格式验证
                    const res = await this.$http.post('/login', this.model)/* .then(res=>{
                        console.log(res)
                    }) */
                    // console.log(res)// 变为同步，通过res获取返回值
                    // console.log("我是第二次执行")
                    this.$Modal.info({
                        title: '提示',
                        content: `<p>${res.data.msg}</p>`
                    });
                    if(res.data.code == 200){// 登录成功判断
                        localStorage.setItem('id', res.data.id)
                        localStorage.setItem('token', res.data.token)
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
        .input{
            margin: 0.15rem 0 0;
        }
    }
</style>