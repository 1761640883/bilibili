<template>
    <div class="edit">
        <navbar/>
        <div style="margin-top:0.12rem;border-bottom:0.01rem solid #ededed"></div>
        <editBanner left="头像">
            <div slot="right" class="edit_userimg">
                <img v-if="model.user_img" :src="model.user_img" alt="图片加载失败">
                <img v-else src="/img/noface.jpg@48w_48h_1c.png" alt="图片加载失败">
                <input type="file" @change="handleToUpload">
            </div>
        </editBanner>
        <editBanner left="昵称">
            <a href="#" slot="right" @click="handleRender('昵称', 'name')">{{model.name}}</a>
        </editBanner>
        <editBanner left="UID">
            <a href="#" slot="right" @click="handleRender('UID', 'username')">{{model.username}}</a>
        </editBanner>
        <editBanner left="性别">
            <a href="#" slot="right" v-if="model.gender" @click="handleRender('性别（男或女）', 'gender')">{{model.gender}}</a>
            <a href="#" slot="right" v-else @click="handleRender('性别（男或女）', 'gender')">保密</a>
        </editBanner>
        <editBanner left="个性签名">
            <a href="#" slot="right" v-if="model.user_desc" @click="handleRender('个性签名', 'user_desc')">{{model.user_desc}}</a>
            <a href="#" slot="right" v-else @click="handleRender('个性签名', 'user_desc')">这个人很神秘，什么都没写</a>
        </editBanner>

        <div class="editback" @click="$router.push('/mine/userinfo')">返回空间</div>
        <div class="editexit" @click="handleToExit">退出</div>
    </div>
</template>

<script>
import navbar from '@/components/Navbar'
import editBanner from '@/components/userComponent/editBanner'

export default {
    name: 'Edit',
    components: {
        navbar,
        editBanner
    },
    data(){
        return {
            model: {},
            value: ''
        }
    },
    methods: {
        async selectUser(){// 获取用户信息
            const res = await this.$http.get('/user/' + localStorage.getItem('id')/* ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            } */)
            // console.log(res);
            this.model = res.data[0];
        },
        async handleToUpload(ev){// 上传头像
            // console.log(ev);
            var file = ev.target.files[0]
            var formdata = new FormData();
            formdata.append('file', file)// 'file'：键值（后端规定的，不能乱写）
            const res = await this.$http.post('/upload', formdata)// 会返回图片路径
            // console.log(res)
            this.model.user_img = res.data.url// 这里修改的只是前端的显示，后台数据并未更新。（所以会导致刷新后，找不到上传的图片了）
            this.UserUpdate();
        },
        async UserUpdate(){// 将返回的图片路径，上传到数据库（将其他数据返回至数据也是此函数）
            const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
            // console.log(res)
            if(res.data.code == 200){
                this.$Message['info']({
                    background: true,
                    content: '修改成功'
                });
            } 
        },
        handleRender (name, key) {// 修改除了头像其他信息
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.value,
                            autofocus: true,
                            placeholder: `请修改你的${name}`
                        },
                        on: {
                            input: (val) => {
                                this.value = val;
                            }
                        }
                    })
                },
                onOk: () => {
                    if(key == 'gender'){
                        // console.log(this.value)
                        if(this.value == '男' || this.value == '女'){
                            this.model[key] = this.value;
                            // console.log(this.model[key]);
                            this.UserUpdate();
                            this.value = '';
                            return;
                        }
                        this.value = '';
                        this.$Message['error']({
                            background: true,
                            content: '输入格式不正确'
                        });
                    }
                }
            })
        },
        handleToExit(){
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            this.$router.push('/mine/login');
        }
    },
    mounted(){
        this.selectUser();
    } 
}
</script>

<style lang="scss" scoped>
    .edit{
        background: #f4f4f4;
        height: 100%;
        a{
            color: gray;
        }
        .edit_userimg{
            position: relative;
            height: 0.5rem;
            width: 0.5rem;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
            input{
                position: absolute;
                z-index: 2;
                opacity: 0;
            }
        }
        .editback{
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.3rem;
            padding: 0.15rem 0;
        }
        .editexit{
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.15rem 0;
            border-top: 0.01rem solid #f4f4f4;
        }
    }
</style>