<template>
    <div>
        <div v-for="data in comentChild" :key="data.comment_id" class="commentitem">
            <div class="commentitem_one" @click.stop="handleToReply(data.comment_id, data.userinfo.name || '')" >
                <div class="commentitem_one_top">
                    <img :src="data.userinfo.user_img">
                    <p>
                        <span>{{data.userinfo.name}}</span><Icon v-if="author != data.parent_id" type="md-arrow-dropright" size="16"/><span v-if="author != data.parent_id">{{data.parent_user_info.name}}</span>
                    </p>
                </div>
                <p v-if="data.comment_content" class="commentitem_one_text">{{data.comment_content}}</p>
                <p v-else style="color: #fb7299" class="commentitem_one_text">Ta什么也没说，就放了一个屁~</p>
            </div>
            <commentitem :comentChild="data.child"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commentitem',
    props: ['comentChild', 'author'],
    methods: {
        handleToReply(id, name){
            this.$store.commit('ModifyAuthorcommentId', id)
            this.$store.commit('ModifyAuthorName', name)
        }
    }
}
</script>

<style lang="scss" scoped>
    .commentitem{
        .commentitem_one{
            font-size: 13px;
            padding: 4px 0;
            .commentitem_one_top{
                display: flex;
                align-items: center;
                img{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid #bfbfbf;
                    margin: 0 10px;
                }
                p{
                    span{
                        &:nth-of-type(1){
                            color:#5291cc;
                        }
                    }
                }
            }
            .commentitem_one_text{
                padding-left: 40px;
                width: 100%;
            }
        }
    }
</style>