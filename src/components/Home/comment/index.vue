<template>
    <div id="comMent" v-if="commentlist">
        <ul>
            <li v-for="data in commentlist" :key="data.comment_id">
                <div class="comment_user" @click.stop="handleToReply(data.comment_id, data.userinfo.name || '')">
                    <div class="comment_user_left">
                        <img :src="data.userinfo.user_img" v-if="data.userinfo">
                        <img src="/img/noface.jpg@48w_48h_1c.png" v-else>
                    </div>
                    <div class="comment_user_right">
                        <p v-if="data.userinfo">
                            {{data.userinfo.name}}
                        </p>
                        <p v-else>ta没有名字</p>
                        <p>
                            {{data.comment_date}}
                        </p>
                    </div>
                </div>
                <div class="comment_text">
                    <p v-if="data.comment_content">{{data.comment_content}}</p>
                    <p v-else style="color: #fb7299">Ta什么也没说，就放了一个屁~</p>
                    <div class="comment_text_ul">
                        <commentitem :comentChild="data.child" :author="data.comment_id"/>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import commentitem from '../commentitem'

export default {
    props: ['commentlist'],
    components: {
        commentitem,
    },
    methods: {
        handleToReply(id, name){
            this.$store.commit('ModifyAuthorcommentId', id)
            this.$store.commit('ModifyAuthorName', name)
        }
    }
}
</script>

<style lang="scss" scoped>
    #comMent{
        padding: 0;
        ul{
            width: 100%;
            li{
                padding: 0.05rem 0.12rem;
                border-top: 0.01rem solid #f0f0f0;
                .comment_user{
                    height: 0.4rem;
                    display: flex;
                    .comment_user_left{
                        width: 0.44rem;
                        img{
                            height: 0.3rem;
                            width: 0.3rem;
                            border-radius: 50%;
                            border: 0.01rem solid #bfbfbf;
                        }
                    }
                    .comment_user_right{
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.13rem;
                        color: #8a8a8a;
                    }
                }
                .comment_text{
                    margin-left: 0.44rem;
                    font-size: 0.14rem;
                    margin-top: -0.14rem;
                    .comment_text_ul{
                        background: #f4f4f4;
                        margin: 0.1rem 0;
                    }
                }
            }
        }
    }
</style>