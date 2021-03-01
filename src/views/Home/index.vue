<template>
    <div id="main" class="home">
        <navbar/>
        <newNav v-if="$store.state.isnewNav" :navlist="navlist" @myevent="handleEvent($event)"/>
        <navList :navlist="navlist" @myevent="handleEvent($event)"/>
        <div class="home_cover" ref="boxDiv" @scroll="handleToScroll">
            <ul ref="listUl">
                <li v-for="data in datalist" :key="data.id" @click="$router.push(`/article/${data.id}`)">
                    <div>
                        <img src="/img/dc54564e9258d109f93bc984d758ccbf6c814d2f.jpg" alt="图片加载失败">
                        <i class="iconfont iconbofang"> 321</i>
                        <i v-if="data.commentlen" class="iconfont iconpinglun"> {{data.commentlen}}</i>
                        <i v-else class="iconfont iconpinglun"> 0</i>
                    </div>
                    <p>{{data.name}}</p>
                </li>
            </ul>
            <div class="home_cover_bottom" v-if="!isEnd">没有更多了</div>
        </div>
    </div>
</template>

<script>
import navbar from '@/components/Navbar'
import navList from '@/components/Home/nav'
import newNav from '@/components/Home/newNav'

export default {
    name: 'Home',
    components: {
        navbar,
        navList,
        newNav
    },
    data(){
        return {
            navlist: [],// 导航
            datalist: [],// 视频列表
            page: 0,// 获取视频的无限加载接口参数
            isTime: true,// 懒加载
            navId: 0,// 当前导航id
            isEnd: true,// 是否加载完毕
        }
    },
    methods: {
        async selectCategery(){// 获取导航数据
            const res = await this.$http.get('/category')
            // console.log(res)
            this.navlist = res.data
        },
        async selectArticle(id) {// 获取列表数据
            const res = await this.$http.get('/detail/' + id, {
                params: {
                    page: this.page,
                    pagesize: 10
                }
            })
            // console.log(res)
            this.datalist = [...this.datalist ,...res.data]
            if(res.data.length < 10){// 判断数据是否加载完毕
                this.isEnd = false;
            }
        },
        handleEvent(ev){// 切换导航，获取新数据
            this.navId = ev;
            this.page = 0;
            this.datalist = [];
            this.isEnd = true
            this.selectArticle(ev) 
        },
        handleToScroll(){// 无限数据
            var ulHeight = this.$refs.listUl.offsetHeight;
            var divScroll = this.$refs.boxDiv.scrollTop + this.$refs.boxDiv.offsetHeight + 20;
            // console.log(ulHeight, divScroll)
            if(ulHeight < divScroll && this.isTime && this.isEnd){// 判断是否满足无限数据条件
                this.isTime = false;
                this.page++;
                this.selectArticle(this.navId)
                setTimeout(()=>{
                    this.isTime = true;
                }, 1000)
            }
        }
    },
    mounted(){
        this.selectCategery();
        this.selectArticle(9);
    }
}
</script>

<style lang="scss" scoped>
.home{
    // display: flex;
    .home_cover{
        flex: 1;
        overflow: auto;
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            li{
                width: 1.7rem;
                height: 1.4rem;
                display: flex;
                flex-flow: column;
                margin: 0.06rem 0;
                justify-content: space-evenly;
                div{
                     width: 1.7rem;
                    height: 0.96rem;
                    border-radius: 0.04rem;
                    overflow: hidden;
                    position: relative;
                    background-image: linear-gradient(transparent 65%,black 97%);
                    img{
                        width: 100%;
                        height: 100%;
                        position: relative;
                        z-index: -1;
                    }
                    i{
                        color: white;
                        position: absolute;
                        font-size: 0.14rem;
                        &:nth-of-type(1){
                            left: 0.06rem;
                            bottom: 0.02rem;
                        }
                        &:nth-of-type(2){
                            right: 0.06rem;
                            bottom: 0.02rem;
                        }
                    }
                } 
                p{
                    font-size: 0.11rem;
                    height: 0.35rem;
                    overflow: hidden;
                    text-overflow:ellipsis;//超出部分用省略号显示
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                }
            }
        }
        .home_cover_bottom{
            text-align: center;
            margin-bottom: 0.1rem;
        }
    }
}
    
</style>