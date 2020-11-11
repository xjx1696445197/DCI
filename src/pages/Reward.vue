<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">奖励记录</p>
        </div>
        <div class="wrapper">
            <div class="reward_list">
                <div class="reward_item" v-for="(item,index) in list">
                    <div class="reward_item_top clearfix">
                        <p class="reward_txt1 fl">直推挖矿奖励（{{item.userName}}）</p>
                        <p class="reward_txt2 fr" :class=" item.rebateType==2?'reward_red':''"><span v-if="item.rebateType==1">+</span><span v-else>-</span>{{item.hashrate}} 算力</p>
                    </div>
                    <div class="reward_item_bottom">
                        <p class="reward_txt1 fl"><span  v-if="item.rebateType==1">储蓄</span><span  v-else>结束储蓄</span>挖矿：{{item.amount}} IUSDT</p>
                        <p class="reward_txt3">{{item.createTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "Reward",
        data(){
            return{
                list:""
            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            },
        },
        mounted() {
            var that=this;
            jsonAjax.post(urlUtil.getApiUrl("pledgeRebateList"), {
                userId:this.userId
            },function (res) {
                that.list=res.resultData.list
            })
        },
        methods:{
            ...mapGetters(['getUserinfo']),

        }
    }
</script>

<style scoped>
    .reward_item_bottom{
        display: flex;
        justify-content: space-between;
    }
    .reward_item{
        border-bottom: 1px solid #EEEEEE;
        height: 1.2rem;
    }
    .reward_item>div{
        margin-top: .175rem;
    }
    .wrapper{
        background: #f5f5f5;
    }
    .reward_list{
        padding: 0.25rem 0.3rem;
        background: #fff;
    }
    .reward_txt1{
        font-size: 0.26rem;
        color: #070707;
        line-height: 0.4rem;
    }
    .reward_txt2{
        font-weight: bold;
        font-size: 0.26rem;
        color: #22AC38;
        line-height: 0.35rem;
    }
    .reward_red{
        font-size: 0.26rem;
        color: #FF0000;
        line-height: 0.35rem;
    }
    .reward_txt3{
        font-size: 0.22rem;
        color: #AAAAAA;
        line-height: 0.35rem;
    }
</style>
