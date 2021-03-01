<template>
    <header id="header">
        <div>
            <img src="/img/512x512bb.png" alt="图片加载失败" @click="$router.push('/home')">
        </div>
        <div>{{title}}</div>
        <div>
            <slot name="right"/>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '登录bilibili'
        }
    }
}
</script>

<style lang="scss" scoped>
    #header{
        border-top: 0.01rem solid #ededed;
        border-bottom: 0.01rem solid #ededed;
        height:0.5rem;
        background: white;
        display: flex;
        div{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            &:nth-of-type(1){
                img{
                    height: 0.3rem;
                }
            }
            &:nth-of-type(2){
                font-size: 0.18rem;
            }
            &:nth-of-type(3){
                font-size: 0.13rem;
            }
        }
    }
</style>