<template>
    <div class="newNav">
        <div class="newNav_background" @click.stop="$store.commit('ModifyIsnewNav', false)"></div>
        <div class="newNav_text">
            <div class="clear" ref="div">
               <p v-for="data in navlist" :key="data._id" class="newNav_text_item" @click="handleToArtides(data._id, data.title)">
                    {{data.title}}
                </p> 
            </div>
            <div class="newNav_text_bottom">
                <Icon type="ios-arrow-up" size="20" @click.stop="$store.commit('ModifyIsnewNav', false)"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['navlist'],
    methods: {
        handleToArtides(id, name){
            this.$store.commit('ModifyIsnewNav', false)
            this.$emit('myevent', id)
            var Div = this.$refs.div;
            var ps = Div.childNodes;
            var num = -1
            for(var i = 0; i < ps.length; i++){
                if(ps[i].innerHTML.search(name) == 1){
                    num = i
                }
            }
            this.$store.commit('ModifyNavName', num)
        }
    }
}
</script>

<style lang="scss" scoped>
    .newNav{
        height: calc(100% - 0.5rem);
        width: 100%;
        position: absolute;
        top: 0.5rem;
        z-index: 5;
        .newNav_background{
            background: black;
            height: 100%;
            opacity: .5;
        }
        .newNav_text{
            position: absolute;
            top: 0;
            background: white;
            width: 100%;
            padding: 0.1rem 0.3rem;
            .newNav_text_item{
                color: #848484;
                font-size: 0.14rem;
                width: 0.63rem;
                height: 0.3rem;
                text-align: center;
                line-height: 0.3rem;
                float: left;
            }
            .newNav_text_bottom{
                text-align: center;
            }
        }
    }
</style>