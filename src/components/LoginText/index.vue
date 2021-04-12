<template>
    <div>
        <span>{{label}}：</span><input :type="type" :placeholder="placeholder" v-model="content">
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            defalut: '注册'
        },
        type: {
            type: String,
            defalut: 'text'
        },
        placeholder: {
            type: String,
            defalut: '请输入姓名s'
        },
    },
    data(){
        return {
            content: ''
        }
    },
    methods: {
        handlerulg(){
            this.$emit('inputChange', this.content)
        }
    },
    watch: {
        content(){
            this.handlerulg()
        }
    }
    
}
</script>

<style lang="scss" scoped>
    div{
        height: 0.5rem;
        width: 100%;
        display: flex;
        background: white;
        border-top: 0.01rem solid #ededed;
        border-bottom: 0.01rem solid #ededed;
        font-size: 0.16rem;
        span{
            display: block;
            width: 0.8rem;
            height: 100%;
            text-align: center;
            line-height: 0.5rem;
        }
        input{
            height: 100%;
            flex-grow: 1;
            margin-right: 0.1rem;
            border: none;
            outline: none;
        }
    }
</style>