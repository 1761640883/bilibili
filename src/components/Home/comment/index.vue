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
                padding: 5px 12px;
                border-top: 1px solid #f0f0f0;
                .comment_user{
                    height: 40px;
                    display: flex;
                    .comment_user_left{
                        width: 44px;
                        img{
                            height: 30px;
                            width: 30px;
                            border-radius: 50%;
                            border: 1px solid #bfbfbf;
                        }
                    }
                    .comment_user_right{
                        flex: 1;
                        display: flex;
                        justify-content: space-between;
                        font-size: 13px;
                        color: #8a8a8a;
                    }
                }
                .comment_text{
                    margin-left: 44px;
                    font-size: 14px;
                    margin-top: -14px;
                    .comment_text_ul{
                        background: #f4f4f4;
                        margin: 10px 0;
                    }
                }
            }
        }
    }
</style>