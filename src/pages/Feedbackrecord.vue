<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">反馈记录</p>
        </div>
        <div class="wrapper">
            <p v-if="list==''">暂无反馈的问题</p>
            <div class="feedbacklist clearfix"  v-for="(item,index) in list"
                 @click="go('FeedbackDetail',item.id,item.userIsRead)">
                <img src="../static/images/newWallet/my_pic.png" class="feedBack_icon fl">
                <div class="fl" style="padding-left: 0.2rem">
                    <p v-if="item.userIsRead==0" class="feedback_txt1">反馈有了新的回复</p>
                    <p v-if="item.userIsRead==1" class="feedback_txt1">反馈暂无回复</p>
                    <p class="feedback_txt2">{{item.question}}</p>
                </div>
                <img src="../static/images/newWallet/icon_go.png" class="feedBack_icon_right fr">
                <div class="fr">
                    <p class="feedback_txt3">{{item.createTime | dataFormat('yyyy-MM-dd')}}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    import {mapGetters} from "vuex";

    export default {
        name: "Feedbackrecord",
        data(){
          return{
              list:[]
          }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            customerId(){
                return this.userinfo.customerId
            }
        },
        mounted(){
            var that=this;
            jsonAjax.get(urlUtil.getApiUrl('dci_findQuestionQuery'), {
                userId:that.customerId,
                pageNo:1,
                pageSize:5
            }, function (result) {
                console.log(result)
                if( result.returnCode == 1 ){
                    that.list = result.resultData
                }
            })

        },
        methods:{
            ...mapGetters(['getUserinfo']),
            go(url,id,isread){
                this.$push({
                    path: '/'+url,
                    query: {
                        id: id,
                        isread:isread
                    }
                })
            }
        }
    }
</script>

<style scoped>

/*    新样式*/
    .feedbacklist{
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #eee;
    }
    .feedBack_icon{
        width: 0.8rem;height: 0.8rem;
    }
    .feedBack_icon_right{
        width: 0.4rem;height: 0.4rem;margin-top: 0.2rem;
    }
    .feedback_txt1{
        font-size: 0.26rem;color: #333;line-height: 0.35rem;font-weight: bold;
        margin-top: 0.1rem;
    }
    .feedback_txt2{
        font-size: 0.22rem;color: #070707;line-height: 0.35rem;
    }
    .feedback_txt3{
        font-size: 0.22rem;color: #aaa;line-height: 0.8rem;
    }
</style>
