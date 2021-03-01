<template>
    <div class="btnparent" @click="registerClick">
        <div class="MineBtn">{{btntext}}</div>
    </div>
</template>

<script>
export default {
    props: {
        btntext: {
            type: String
        }
    },
    methods: {
        registerClick(){
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style lang="scss" scoped>
.btnparent{
    padding: 0.15rem 0.1rem;
    .MineBtn{
        height: 0.45rem;
        background: #ff9db5;
        color: white;
        text-align: center;
        line-height: 0.45rem;
        border-radius: 0.225rem;
        font-size: 0.16rem;
    }
}
</style>