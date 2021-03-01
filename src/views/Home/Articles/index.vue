<template>
    <div class="articles" v-if="loading">
        <navbar/>
        <div class="articles_video">
            <video src="/img/泰特现代美术馆_ 注意这个地方(Tate Modern _ _爱给网_aigei_com.mp4" controls></video>
        </div>
        <div class="articles_center">
            <div class="articles_title">
                <p>{{data.category.title}}</p>
                <h2>{{data.name}}</h2>
            </div>
            <div class="articles_content">
                <div class="articles_content_title">
                    <div class="articles_content_title_left">
                        <img v-if="data.userinfo" :src="data.userinfo.user_img" @click.stop="$router.push(`/author/${data.userid}`)">
                        <img v-else src="/img/noface.jpg@48w_48h_1c.png" alt="图片加载失败">
                        <div v-if="data.userinfo">
                            <p>{{data.userinfo.name}}</p>
                            <p>{{data.userinfo.id}}粉丝</p>
                        </div>
                    </div>
                    <div :class="issubscript?'articles_content_title_right subscriptactive':'articles_content_title_right'"  @click="handleTosubscript">
                        <span v-if="!issubscript">
                            ＋ 关注
                        </span>
                        <span v-else>
                            已关注
                        </span>
                    </div>
                </div>
                <div class="articles_content_center">
                    <span>{{data.userid}}观看</span><span>{{data.id}}弹幕</span><span>{{data.date}}</span>
                </div>
                <div class="articles_content_bottom" :key="iscollection">
                    <i class="iconfont icondianzan"></i><span>点赞</span>
                    <i :class="iscollection? 'iconfont iconshoucang active':'iconfont iconshoucang'" @click="handleToCollection"></i><span @click="handleToCollection">收藏</span>
                    <i class="iconfont iconhuancun"></i><span>缓存</span>
                    <i class="iconfont iconfenxiang"></i><span>分享</span>
                </div>
            </div>
            <div class="articles_center_commend">
                <h2>推荐</h2>
                <ul ref="listUl">
                    <li v-for="commenddata in commendlist" :key="commenddata.id" @click="$router.push(`/article/${commenddata.id}`)">
                        <div>
                            <img src="/img/dc54564e9258d109f93bc984d758ccbf6c814d2f.jpg" alt="图片加载失败">
                            <i class="iconfont iconbofang"> 321</i>
                            <i v-if="commenddata.commentlen" class="iconfont iconpinglun"> {{commenddata.commentlen}}</i>
                            <i v-else class="iconfont iconpinglun"> 0</i>
                        </div>
                        <p>{{commenddata.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="articles_center_comments" @click="handleDelete">
                <h2 v-if="commentNum">评论（{{commentNum}}）</h2>
                <h2 v-else>评论（0）</h2>
                <div class="articles_center_comments_position">
                    <img :src="myuser.user_img" v-if="myuser.user_img">
                    <img v-else src="/img/noface.jpg@48w_48h_1c.png">
                    <input v-if="this.$store.state.authorName != null" type="text" :placeholder="'回复：' + this.$store.state.authorName" @focus="fucusInput" v-model="comcontent" @click.stop="">
                    <input v-else type="text" placeholder="说点什么吧" v-model="comcontent">
                    <span @click.stop="cmentPublish">回复</span>
                </div>
                <comment :commentlist="commentList" :key="commentNum"/>
            </div>
        </div>
    </div>    
</template>

<script>
import navbar from '@/components/Navbar'
import comment from '@/components//Home/comment'

export default {
    name: 'articles',
    props: ['id'],
    data(){
        return {
            data: {},// 作者信息
            loading: false,// 数据是否加载完毕
            commendlist: {},// 推荐视频列表
            myuser: {},// 自己的信息
            commentList: [], // 处理后的递归数据
            commentNum: 0, // 评论条数
            comcontent: '', // 我发表的评论
            Postcom: {// 发送评论需要的参数
                comment_content: '',
                comment_date: '',
                parent_id: null,
                article_id: null
            },
            iscollection: false,// 是否收藏该文章
            issubscript: false,// 是否关注该用户
        }
    },
    components:{
        navbar,
        comment
    },
    methods: {
        async articleitemDate(){// 获取视频详情页
            const res = await this.$http.get('/article/' + this.id);
            console.log(res);
            this.data = res.data[0];
            this.loading = true;
            this.subscriptClick();
        },
        async comendData(){// 推荐视频
            const res = await this.$http.get('/commend/');
            // console.log(res)
            this.commendlist = res.data
        },
        async myUserinfo(){// 获取自己的信息
            if(!localStorage.getItem('id') && !localStorage.getItem('token')){// 判断用户是否登录
                return;
            }
            const res = await this.$http.get('/user/' + localStorage.getItem('id'))
            // console.log(res)
            this.myuser = res.data[0];
        },
        async commentDate(){// 获取评论数据
            // http://112.74.99.5:3000/web/api/comment/193（280都还可以用）
            const res = await this.$http.get('/comment/' + this.$route.params.id)
            var datalist = res.data;
            this.commentNum = datalist.length;
            // console.log(this.commentNum)
            
            this.commentList = this.reply(datalist);//处理评论数据
        },
        async replyText(){// 发送回复
            const res = await this.$http.post('/comment_post/' + localStorage.getItem('id'), this.Postcom);
            // console.log(res)
        },
        async collection(){// 收藏
            const res = await this.$http.post('/collection/' + localStorage.getItem('id'), {article_id: this.id})
            if(res.data.code == 200){
                this.$Message.info(res.data.msg);
            }
        },
        async collectionClick(){// 查看是否收藏该文章
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
                    params: {
                        article_id: this.id
                    }
                })
                this.iscollection = res.data.success;
                // console.log(this.iscollection)
            }
        },
        async subscript(){// 关注
            const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), {sub_id: this.data.userid})
            if(res.data.code == 200){
                this.$Message.info(res.data.msg);
            }
            // console.log(res)
        },
        async subscriptClick(){// 查看是否关注该用户
            if(localStorage.getItem('token')){
                const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
                    params: {
                        sub_id: this.data.userid
                    }
                })
                this.issubscript = res.data.success;
                // console.log(this.issubscript)
            }
        },
        fucusInput(){// 判断是否登录
            if(!localStorage.getItem('id') && !localStorage.getItem('token')){
                this.$Modal.warning({
                    title: '警告',
                    content: '<p>请先登录</p>'
                });
                this.$router.push('/mine/login');
                return false
            }
            return true;
        },
        reply(data){// 多层级回复处理（递归，渲染也需要用到组件递归）
            // var arrList = data.filter(item => item.parent_id == null);
            function fn(temp){
                let arr1 = [];
                for(var i =0; i < data.length; i++){
                    if(data[i].parent_id == temp){
                        arr1.push(data[i]);
                        data[i].child = fn(data[i].comment_id)
                    }
                }
                return arr1;
            }
            const res = fn(null);
            // console.log(res)
            return res;
            
        },
        cmentPublish(){// 发表评论点击事件
            var isLoding = this.fucusInput()
            if(!isLoding){
                return;
            }
            const date = new Date();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            if(m < 10){
                m = "0" + m;
            }
            if(d < 10){
                d = "0" + d
            }
            let nowDate = m + '-' + d
            this.Postcom.comment_content = this.comcontent;
            this.Postcom.comment_date = nowDate;
            this.Postcom.article_id = this.id
            this.Postcom.parent_id = this.$store.state.authorcommentId
            this.replyText();
            this.$store.commit('ModifyAuthorcommentId', null);
            this.$store.commit('ModifyAuthorName', null)
            this.comcontent = '';
            setTimeout(()=>{
                this.commentDate();
            }, 500)
            // console.log(this.Postcom)
        },
        handleDelete(){// 重置评论的信息
            this.$store.commit('ModifyAuthorName', null);
            this.$store.commit('ModifyAuthorcommentId', null);
        },
        handleToCollection(){// 点击收藏
            var isLoding = this.fucusInput()
            if(!isLoding){
                return;
            }
            this.collection();
            this.iscollection = !this.iscollection
        },
        handleTosubscript(){// 点击关注
            var isLoding = this.fucusInput()
            if(!isLoding){
                return;
            }
            this.subscript();
            this.issubscript = !this.issubscript
        }
    },
    activated(){// 每次切换页面会触发（在这里是刷新数据）(如果是article（详情页切换不会有反应）)
        // console.log(this.id);
        this.commentNum = 0;
        this.loading = false
        this.myuser = {};// 清空缓存的自己信息
        this.articleitemDate();
        this.collectionClick()
        this.comendData();
        this.myUserinfo();
        this.commentDate();
    },
    watch: {//切换article（详情页切换）会触发，第一次进入不触发
        id(){
            this.$store.commit('ModifyAuthorName', null)
            this.$store.commit('ModifyAuthorcommentId', null);
            this.loading = false;
            this.commentList = {};
            this.articleitemDate();
            this.collectionClick()
            this.comendData();
            this.myUserinfo();
            this.commentDate();
        }
    }
}
</script>

<style lang="scss" scoped>
    .articles{
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        .articles_video{
            width: 100%;
            height: 212px;
            overflow: hidden;
            video{
                width: 100%;
            }
        }
        .articles_center{
            flex: 1;
            overflow: auto;
            .articles_title{
                padding: 12px;
                display: flex;
                align-items: center;
                p{
                    width: 48px;
                    height: 20px;
                    font-size: 11px;
                    background: #f4f4f4;
                    border-radius: 10px;
                    color: #fb7299;
                    line-height: 20px;
                    text-align: center;
                    margin-right: 6px;
                }
                h2{
                    font-size: 16px;
                    flex: 1;
                }
            }
            .articles_content{
                padding: 0 12px;
                .articles_content_title{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .articles_content_title_left{
                        display: flex;
                        align-items: center;
                        img{
                            height: 38px;
                            width: 38px;
                            border-radius: 50%;
                            border: 1px solid #bfbfbf;
                        }
                        div{
                            display: flex;
                            flex-flow: column;
                            justify-content:space-evenly;
                            margin-left: 8px;
                        p{
                                &:nth-of-type(1){
                                    font-size: 14px;
                                }
                                &:nth-of-type(2){
                                    font-size: 10px;
                                    color: #9b99a4;
                                }
                            } 
                        } 
                    }
                    .articles_content_title_right{
                        width: 68px;
                        height: 25px;
                        border: 1px solid #fc88ad;
                        border-radius: 5px;
                        color: #fc83a5;
                        font-size: 12px;
                        line-height: 23px;
                        text-align: center;
                    }
                    .subscriptactive{
                        color: white;
                        background: #fc83a5;
                    }
                }
                
                
                .articles_content_center{
                    font-size: 10px;
                    color: #a2a7a9;
                    margin-top: 10px;
                    span{
                        padding-right: 12px;
                    }
                }
                .articles_content_bottom{
                    font-size: 10px;
                    color: #757575;
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    .active{
                        color: #fb7299;
                    }
                    span{
                        margin-right: 20px;
                        padding-top: 2px;
                    }
                    i{
                        padding-right: 6px;
                        padding-top: 1.6px;
                    }
                }
            } 
            .articles_center_commend{
                border-top: 1px solid #f7f7f7;
                padding: 0 12px;
                h2{
                    height: 46px;
                    font-size: 14px;
                    color: #757575;
                    line-height: 46px;
                }
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
            }
            .articles_center_comments{
                border-top: 1px solid #f0f0f0;
                position: relative;
                h2{
                    height: 46px;
                    font-size: 14px;
                    color: #757575;
                    padding:0 12px;
                    line-height: 46px;
                    margin-bottom: -10px;
                }
                .articles_center_comments_position{
                    padding: 14px 12px;
                    display: flex;
                    align-items: center;
                    position: sticky;
                    top: 0;
                    img{
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        border: 1px solid #bfbfbf;
                        margin-right: 10px;
                    }
                    input{
                        background: #f4f4f4;
                        height: 0.3rem;
                        width: 90%;
                        border-radius: 0.15rem;
                        border: none;
                        outline: none;
                        padding-left: 8px;
                        flex: 1;
                    }
                    span{
                        height: 30px;
                        padding: 0 10px;
                        border-radius: 15px;
                        background: #fb6992;
                        color: white;
                        margin-left: 10px;
                        line-height: 30px;
                        font-size: 12px;
                    }
                }
            }
        } 
    }
</style>