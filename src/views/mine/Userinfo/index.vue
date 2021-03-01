<template>
    <div>
        <navbar/>
        <div class="backgImg"></div>
        <userDetail :userInfo="model"/>
    </div>
</template>

<script>
import navbar from '@/components/Navbar'
import userDetail from '@/components/userComponent/userDetail'

export default {
    name: 'Userinfo',
    data() {
        return{
            model: {}
        }
    },
    components: {
        navbar,
        userDetail
    },
    methods: {
        async UserinfoDate(){
            if(!localStorage.getItem('id')){
                return;
            }
            const res = await this.$http.get('/user/' + localStorage.getItem('id')/* ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            } */)
            console.log(res)
            this.model = res.data[0]
        }
    },
    activated(){
        this.UserinfoDate();
    }
}
</script>

<style lang="scss" scoped>
    .backgImg{
        height: 1rem;
        background: url('/img/bannerTop_new.png') no-repeat center center;
        background-size: 100% auto;
    }
</style>