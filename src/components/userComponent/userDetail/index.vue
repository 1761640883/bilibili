<template>
    <div class="userDetail">
        <div class="user_top">
            <div class="user_img">
                <img v-if="userInfo.user_img" :src="userInfo.user_img" alt="图片加载失败">
                <img v-else src="/img/noface.jpg@48w_48h_1c.png" alt="图片加载失败">
            </div>
            <div class="user_edit">
                <ul>
                    <li>
                        <span>--</span>
                        <span>粉丝</span>
                    </li>
                    <li>|</li>
                    <li>
                        <span>--</span>
                        <span>关注</span>
                    </li>
                    <li>|</li>
                    <li>
                        <span>--</span>
                        <span>获赞</span>
                    </li>
                </ul>
                <div class="user_deit_info">
                    <div @click="$router.push('/mine/edit')">编辑资料</div>
                </div>
            </div>
        </div>
        <div class="user_center">
            <h2>{{userInfo.name}} <Icon v-if="userInfo.gender == '男'" type="md-male" color="#1389bf"/><Icon type="md-female" v-else color="#fb7299"/></h2>
            <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
            <p v-else>这个人很神秘，什么都没有写</p>
        </div>
        <div class="user_bottom">
            <ul class="clear">
                <li>动态</li>
                <li>视频</li>
            </ul>
        </div>
    </div>    
</template>

<script>
export default {
    props: {
        userInfo: {
            type: Object
        }
    }
}
</script>

<style lang="scss" scoped>
    .userDetail{
        background: white;
        .user_top{
            padding: 0 0.12rem;
            display: flex;
            justify-content: space-between;
           .user_img{
                width: 0.85rem;
                height: 0.85rem;
                border-radius: 50%;
                overflow: hidden;
                margin-top: -0.08rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .user_edit{
                ul{
                    display: flex;
                    align-items: center;
                    li{
                        &:nth-of-type(2n+1){
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            width: 0.7rem;
                            height: 0.5rem;
                        }
                        &:nth-of-type(2n){
                            color: #f4f4f4;
                            font-size: 0.2rem;
                        }
                        span{
                            display: block;
                            &:nth-of-type(2){
                                color: #999999;
                                font-size: 0.11rem;
                            }
                        }
                    }
                }
                .user_deit_info{
                    width: 2.2rem;
                    height: 0.3rem;
                    border: 0.01rem solid #fda4bd;
                    border-radius: 0.06rem;
                    color: #fb7299;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    div{
                        font-size: 0.16rem;
                    }
                }
            } 
        }
        .user_center{
            padding: 0 0.12rem;
            h2{
                font-weight: bold;
                padding: 0.1rem 0;
            }
            p{
                font-size: 0.13rem;
                color: #9999a6;
                padding: 0 0 0.1rem;
            }
        }
        .user_bottom{
            height: 0.4rem;
            border-top: 0.01rem solid #ededed;
            border-bottom: 0.01rem solid #ededed;
            ul{
                height: 100%;
                li{
                    float: left;
                    height: 100%;
                    line-height: 0.4rem;
                    padding: 0 0.12rem;
                    font-size: 0.13rem;
                }
            }
            
        }
    }
</style>