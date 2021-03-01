<template>
    <div class="editBanner">
        <div>
            <span>{{left}}</span>
            <span><slot name="right"/></span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        left: {
            type: String
        }
    }   
}
</script>

<style lang="scss" scoped>
    .editBanner{
        background: white;
        padding: 0.15rem;
        border-bottom: 0.01rem solid #ededed;
        font-size: 0.14rem;
        div{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>