<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">收益记录</p>
        </div>
        <div class="wrapper">
            <div class="revenuerList">
                <div v-for="(item,index) in list">
                    <div>
                        <p>收益</p>
                        <p>{{item.createTime|dataFormat('yyyy-MM-dd')}}</p>
                    </div>
                    <div>
                        + {{item.income}} DCI
                    </div>
                </div>

            </div>
            <p v-if="list==''">
                加载完成
            </p>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    export default {
        name: "Revenuerecords",
        data(){
            return{
                list:"",
                recordId:this.$route.query.recordId
            }
        },
        mounted() {
            var that=this;
            jsonAjax.post(urlUtil.getApiUrl("pledgeIncomeList"), {
                userId: this.userId,
                recordId:this.recordId,
                pageNo:1,
                pageSize:10
            },function (res) {
                if (res.returnCode==1){
                    that.list=res.resultData.list
                }
            })
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            }
        },
        methods:{
            ...mapGetters(['getUserinfo']),

        }
    }
</script>

<style scoped>
    .wrapper{
        background: #f5f5f5;
    }
    .wrapper>p{
        text-align: center;
        font-size: .24rem;
        color: #333333;
        line-height: .7rem;
    }
.revenuerList>div{
    border-bottom: 1px solid #eeeeee;
    display: flex;
    height: 1.2rem;
    background: white;
    padding:0 .3rem;
    justify-content: space-between;
    line-height: 1.2rem;

}
    .revenuerList>div>div:nth-of-type(2){
        color: #8E398C;
        font-weight: bold;
        font-size: .26rem;
    }
    .revenuerList>div>div:nth-of-type(1) p{
        line-height: .45rem;
    }
    .revenuerList>div>div:nth-of-type(1) p:nth-of-type(1){
        margin-top: .14rem;
    }
</style>
