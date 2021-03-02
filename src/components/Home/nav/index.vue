<template>
    <div class="nav">
        <ul class="navUl" ref="navUl" :key="$store.state.navName">
            <!-- <li v-for="data in navlist" :key="data._id" @click.stop="handleToActive($event, data._id)" class="li">{{data.title}}</li> -->
            <li v-for="data in navlist" :key="data._id" @click.stop="handleToActive(data._id, data.title)" class="li">{{data.title}}</li>
        </ul>
        <div class="navBtn" @click="$store.commit('ModifyIsnewNav', true)">
            <Icon type="ios-arrow-down" size="20"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        navlist: {
            type: Array
        }
    },
    methods: {
        /* handleToActive(ev, id){// 切换内容（以前的办法）
            var lis = ev.path[1].childNodes
            for(var i = 0; i < lis.length; i++){
                lis[i].className = ''
            }
            // console.log(ev)
            ev.srcElement.className = 'active'
            this.$emit("myevent", id)
        } */
        handleToActive(id, name){// 切换内容（vue的方法）
            this.$emit("myevent", id)
            var navUl = this.$refs.navUl
            var lis = navUl.childNodes
            var num = 0;
            for(var i = 0; i < lis.length; i++){
                if(lis[i].innerHTML.search(name) == 0){
                    // console.log('ok')
                    num = i
                }
            }
            this.$store.commit('ModifyNavName', num)
        }
    },
    updated(){
        /* var navUl = document.getElementsByClassName('navUl')
        console.log(navUl)
        navUl[0].childNodes[0].className = 'active' */

        var navUl = this.$refs.navUl
        navUl.childNodes[this.$store.state.navName].className = 'active'
    }
}
</script>

<style lang="scss" scoped>
    .nav{
        height: 0.4rem;
        border-bottom: 0.01rem solid #ededed;
        width: 100%;
        overflow: hidden;
        display: flex;
        .navUl{
            height: 0.57rem;
            display: flex;
            white-space: nowrap;
            overflow-x: scroll;
            overflow-y: hidden;
            li{
                padding: 0 0.2rem;
                line-height: 0.4rem;
            }
            .active{
                color: #fb7299;
                position: relative;
                &::after{
                    content: '';
                    display: block;
                    background: #fb7299;
                    width: 0.28rem;
                    height: 0.02rem;
                    position: absolute;
                    bottom: 0.18rem;
                }
            }
        }
        .navBtn{
            width: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>