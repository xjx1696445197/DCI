<template>
    <div class="page">

        <div class="HEADER_WALLET">
            <p class="HEADER_TITLE_WALLET">矿池</p>

        </div>
        <div class="wrapper">
            <img src="../static/images/newWallet/Mortgagebackground.png" class="Mortgagebackground">
            <div class="today">
                <div>
                <p>今日矿池产出</p>
                    <p><span>{{todaydata.miningIncome|tofixed4}}</span><span>DCI</span></p>

                </div>
                <div>
                    <p>今日储蓄算力</p>
                <p><span>{{todaydata.hashrateTotal|tofixed4}}</span><span>IUSDT</span></p>
                </div>
            </div>
            <div class="walletTypeList" @click="go('MiningHomepage')">
                <div>
                    <img src="../static/images/newWallet/Mortgagemining.png">
                    <span>储蓄挖矿</span>
                </div>
                <img src="../static/images/newWallet/go.png">
            </div>
<!--            <div class="walletTypeList" @click="go('MiningHomepage')">-->
<!--                <div>-->
<!--                    <img src="../static/images/newWallet/Mortgagemining.png">-->
<!--                    <span>质押挖矿</span>-->
<!--                </div>-->
<!--                <img src="../static/images/newWallet/go.png">-->
<!--            </div>-->
        </div>
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1200"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
        <div class="mbs" v-if="tipss">
            <div class="tips">
                <div>
                    提示
                </div>
                <div>

                    当前账号没有绑定手机号/邮箱，请绑定。
                    绑定后可进行储蓄挖矿。

                </div>
                <div>
                    <div @click="toBind('tel')">
                        绑定手机号
                    </div>

                    <div  @click="toBind('email')">
                        绑定邮箱
                    </div>
                </div>
            </div>
            <div class="close" @click="close">
                <img src="../static/images/newWallet/close.png">
            </div>
        </div>
    </div>
</template>

<script>
    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    import Nlayer from '@/components/Nlayer'

    export default {
        name: "Orepool",
        components: {
            Nlayer
        },
        data(){
          return{
              todaydata: {},
              tipsVisible: false,
              tipss:false,
              tips:"",
              currentstate:localStorage.getItem("CurrentlyselectedWallet"),
              userinfo:JSON.parse(localStorage.getItem("userinfo"))
          }
        },
        created() {
            var that=this;
            jsonAjax.post(urlUtil.getApiUrl("findMiningIncomeAndHashrate"), {
            },function (res) {
                that.todaydata=res.resultData
            })
            if (this.userinfo.email==null&&this.userinfo.phone==null){
                this.tipss=true;
            }
        },
        methods:{
            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            },
            go(url){
                if (this.userinfo.email==null&&this.userinfo.phone==null){
                    this.tipss=true;
                }else{
                    if (this.currentstate==1){
                        this.$push({
                            path: '/'+url
                        })
                    }else {
                        this.showTips("请切换HALE链进行储蓄挖矿")
                    }
                }
            },
            //toBind
            toBind(name){
                this.$push({
                    path: '/bind',
                    query: {
                        name: name,
                        account:this.userinfo.loginName
                    }
                })
            },
            close(){
                this.tipss =false
            }
        }
    }
</script>

<style scoped>
    .mbs{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .tips{
        width: 6rem;
        height: 2.9rem;
        background: white;
        border-radius: .3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left:  -3rem;
        margin-top:-1.25rem;
    }
    .close{
        position: absolute;
        bottom: 28%;
        left: 50%;
        margin-left: -.35rem    ;
        text-align: center;
        line-height: .7rem;
        background: #a8a8a8;
        width: .7rem;
        height: .7rem;
        border-radius: 50%;
    }
    .close img{
        width: .3rem;
        margin-top: .2rem;
        margin-left: .2rem;
        height: .3rem;
    }
    .tips>div:nth-of-type(1){
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
    }
    .tips>div:nth-of-type(2) {
        padding: 0 .3rem;
        text-align: center;
        color: #070707;
        font-size: .26rem;
    }
    .tips>div:nth-of-type(3){
        display: flex;
        justify-content: space-around;
        margin-top: .25rem;
    }
    .tips>div:nth-of-type(3)>div {
        width: 2.1rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .24rem;
        box-shadow: 0px 5px 15px 0px rgba(100, 27, 118, 0.3);
        color: white;
        background: #8E398C;
        border-radius: .3rem;
    }
    .wrapper{
        background: #F5F5F5;
    }
    .walletTypeList{
        justify-content: space-between;
        padding: 0 .3rem;
        background: white;
        border-radius: .2rem;
        height: 1.8rem;
        line-height: 1.8rem;
        width: 6.3rem;
        margin: 0 auto;
        margin-top: .5rem;
        display: flex;
    }
    .walletTypeList div{
        display: flex;

    }
    .today{
        display: flex;
        justify-content: space-around;
        margin-top: .3rem;
    }
    .today>div>p{
        line-height: .6rem;
    }
    .today>div>p:nth-of-type(1){
        font-size: .24rem;
        color: #333333;
        font-weight: bold;
    }
    .today>div>p:nth-of-type(2) {
        display: flex;
        justify-content: space-between;
        font-size: .26rem;
        color: #333333;
        font-weight: bold;
    }
    .today>div>p:nth-of-type(2) span:nth-of-type(1){
        font-size: .3rem;
        font-style:italic;
    }
    .today>div{
        background: white;
        border-radius: .3rem;
        width: 3rem;
        height: 1.3rem;
        padding: .15rem;
    }
    .walletTypeList >div>img{
        width: 1rem;
        height: 1rem;
        margin-top: .4rem;
    }
    .walletTypeList >div>span{
        color: #070707;
        font-size: .34rem;
        font-weight:bold;
        margin-left: .3rem;
    }
    .walletTypeList >img{
        margin-right: .1rem;
        width: .5rem;
        height: .5rem;
        margin-top: .65rem;
    }
    .Mortgagebackground{
        width: 100%;
    }
</style>
