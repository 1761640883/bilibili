<template>
    <header id="navbar">
        <div>
            <img v-if="isHome" src="/img/512x512bb.png" alt="图片加载失败" @click="$router.push('/home')">
            <img v-else src="/img/512x512bb.png" alt="图片加载失败">
        </div>
        <div>
            <p>
                <Icon type="md-search" />
                <i>请输入内容</i>
            </p>
        </div>
        <div>
            <img v-if="!model.user_img" src="/img/noface.jpg@48w_48h_1c.png" alt="图片加载失败" @click="handleToUserinfo">
            <img v-else :src="model.user_img" alt="图片加载失败" @click="handleToUserinfo">
            <p>下载App</p>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        
    },
    data(){
        return {
            model: {},
            isHome: true,// 判断当前是否是home页面
            isuserinfo: true,// 判断当前是否是userinfo页面
        }
    },
    methods: {
        async selectUser(){// 获取用户信息
            if(!localStorage.getItem('id') && !localStorage.getItem('token')){// 判断用户是否登录
                return;
            }
            const res = await this.$http.get('/user/' + localStorage.getItem('id')/* ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            } */)
            // console.log(res);
            this.model = res.data[0];
        },
        handleToUserinfo(){
            if(!this.isuserinfo){
                return;
            }
            this.$router.push('/mine/userinfo')
        }
    },
    mounted(){
        this.selectUser();
    },
    activated(){
        if(this.$route.path == '/home'){
            this.isHome = false
        }
        if(this.$route.path == '/mine/userinfo'){
            this.isuserinfo = false
        }
        this.model = {};
        this.selectUser();
    }
}
</script>

<style lang="scss" scoped>
    #navbar{
        border-top: 0.01rem solid #ededed;
        border-bottom: 0.01rem solid #ededed;
        height:0.5rem;
        background: white;
        display: flex;
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            &:nth-of-type(1){
                width: 0.8rem;
                img{height: 0.3rem;}
            }
            &:nth-of-type(2){
                flex: 1;
                font-size: 0.18rem;
                p{
                    background: #f4f4f4;
                    height: 0.3rem;
                    width: 90%;
                    border-radius: 0.15rem;
                    i{
                        margin-left: 0.06rem;
                        line-height: 0.3rem;
                        &:nth-of-type(2){
                            font-size: 0.14rem;
                            font-style: normal;
                        }
                    }
                }
            }
            &:nth-of-type(3){
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.13rem;
                margin-left: 0.05rem;
                img{
                    height: 0.35rem;
                    width: 0.35rem;
                    border-radius: 50%;}
                p{
                    padding: 0.02rem 0.1rem;
                    background: #ff9db5;
                    color: white;
                    font-size: 0.13rem;
                    border-radius: 0.04rem;
                    margin: 0 0.06rem;
                }
            }
        }
    }
</style>