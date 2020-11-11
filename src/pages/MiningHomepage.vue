<template>
    <div class="page">

        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">选择钱包类型</p>

        </div>
        <div class="wrapper">
            <div class="miningmain">
                <div class="miningMainBox">
                    <div>
                        <p>可用余额（IUSDT）</p>
                        <p>{{Tokenbalance|tofixed6}}</p>
                    </div>
                    <div>
                        <p>已储蓄（IUSDT）</p>
                        <p>{{stakebalance|tofixed6}}</p>
                    </div>
                    <div>
                        <p>储蓄次数（进行/总）</p>
                        <p><span v-if="stakebalance>0">1</span><span v-else>0</span>/1</p>
                    </div>
                    <div>
                        <p>已获得收益（DCI）</p>
                        <p>{{rewardbalance}}</p>
                    </div>
                </div>
                <div class="mortgageEntrance"  v-if="Mortgageentrance">
                    <div>
                        <p>暂无储蓄</p>
                        <p @click="showMb">储蓄</p>
                    </div>
                    <img src="../static/images/newWallet/Mortgageillustration.png">
                </div>
                <div class="Mortgaged" v-if="!Mortgageentrance">
              <span>
                  {{stakebalance|tofixed6}} IUSDT 储蓄中
              </span>
                    <div  @click="go('Mortgagedetails',pledgelist[0].recordId)">详情</div>
                </div>
            </div>
            <div class="ff5"></div>
            <div class="mortgageList">
                <div  v-for="(item,index) in pledgelist" @click="go('Mortgagedetails',item.recordId)">
                    <div>
                        <p>储蓄时间：{{item.startTime|dataFormat('yyyy-MM-dd')}}</p>
                        <p>储蓄数量：{{item.amountPledge}} IUSDT</p>
                    </div>
                    <div>
                        <span v-if="item.pledgeType==1">
                                                    进行中
                        </span>
                        <span class="or"  v-if="item.pledgeType==2">
                                                    已结束
                        </span>
                        <img src="../static/images/newWallet/icon_go.png">
                    </div>
                </div>
            </div>
            <div class="text">加载完成！！！</div>
        </div>
        <div class="mb" v-if="mbstate">
            <div class="mortgagemb">
                <div>开启储蓄 <img src="../static/images/newWallet/close.png" @click="hideMb"></div>
                <div v-show="false"><span>储蓄挖矿剩余产出</span> <span>12,345,678.1234 DCI</span></div>
                <div>
                    <div>
                        储蓄数量（IUSDT）
                    </div>
                    <input type="number" v-model="amount" placeholder="请输入储蓄IUSDT数量">
                </div>
                <div><span>需支付手续费：</span> <span>{{gasLimit*gasPrice/1000000}} HALE</span></div>
                <div @click="confirmationOfMortgage">确认开启</div>
            </div>
        </div>
        <!--输入密码弹窗-->
        <nlayer
                :visible="passwordDigVisible"
                @close="passwordDigClose"
                class="ANIMATITE_BOTTOM_TO_TOPS NDIALOG"
                width="100%"
                :zIndex="999"
        >
            <div class='DIALOGS'>
                <div class='DIALOG_GE_TITLE'
                     @click='closePasswordDig'
                >
                    密码
                </div>
                <div class='DIALOG_GE_CONTENT'>
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="password"
                                   class="PASSWORD_GE_INPUTS"
                                   placeholder="请输入钱包密码"
                                   v-model="password"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_BTNSS'>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto btntop'
                            :class="[isCheckPassword ? 'active' : '']"
                            @click='checkPassword'
                    >确认
                    </div>
                </div>
            </div>
        </nlayer>
        <!--        加载中-->
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0.1)"
                :visible="loadingVisible"
                class="NLOADING"
                :zIndex="1001"
        >
            <div class="LOADING">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve" width="0.8rem"
                     height="0.8rem">
                    <path opacity="0.1" fill="#fff"
                          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff"
                          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20"
                                          to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
                <p class="LOADING_TXT">储蓄中...</p>
            </div>
        </nlayer>
        <!--        弹窗提示-->
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1200"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
                :zIndex="99999"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
    </div>
</template>

<script>
    import Nlayer from '@/components/Nlayer'
    import tx from '@/util/txUtil'
    import {getPrivat, Halletoeth, Ethtohelle, Existingaccounts} from '@/util/dip'
    import Web3 from 'web3'
    import jsonAjax from '../util/restUtil.js';
    import urlUtil from "../util/apiUtil";
    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'
    const Txs = require('ethereumjs-tx');
    import {tofixed6} from "static/js/untils"

    export default {
        name: "MiningHomepage",
        components: {
            Nlayer
        },
        data() {
            return {
                mbstate: false,
                passwordDigVisible: false,
                password: "",
                isCheckPassword: "",
                amount:0,
                web3: {},
                myaddress:"",
                loadingVisible: false,
                tips: '',
                tipsVisible: false,
                Tokenbalance:"",
                stakebalance:"",
                rewardbalance:"",
                Mortgageentrance:true,
                Mortgagecontract:"0x9e7A7D1fB71dD9F96b42Ff115cd3A44aaE3Ae529",//储蓄合约
                pledgelist:[],
                gasLimit:5000000,
                gasPrice:2
            }
        },
        mounted(){
            this.myaddress =localStorage.getItem("assetaddress")
            this.web3 = this.createWeb3()
            //获取代币余额
            this.getbalanc()
            this.rewardOfs()
            this.mortgageList()
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            }
        },
        watch:{
            amount(newVal) {
                if (this.amount<0){
                    this.amount = 0
                    this.showTips("不可输入负数")
                    return
                }
                if (this.amount>this.Tokenbalance){
                    this.amount=tofixed6(this.Tokenbalance-this.Tokenbalance%100)
                    this.showTips("超出余额")
                    return
                }
            }
        },
        methods: {
            ...mapGetters(['getUserinfo']),

            //获取余额
            getbalanc(){
                var that=this;
                tx.balanceOf(this.web3, this.myaddress, that.Mortgagecontract).then((res) => {
                    that.Tokenbalance = res / 1000000000000000000
                    console.log(res)
                })
                tx.stakeOfs(this.web3,this.myaddress).then((res)=>{
                    this.stakebalance=res
                    console.log(res)
                    if (res>0){
                        this.Mortgageentrance=false
                    }
                })
            },
            //查看收益
            rewardOfs(){
                var that=this;
                tx.rewardOfs(this.web3,this.myaddress).then((res)=>{
                    this.rewardbalance=res
                    console.log(res)
                })
            },
            //初始化web3
            createWeb3() {
                let web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));
                return web3
            },
            go(url,recordId) {
                this.$push({
                    path: '/' + url,
                    query:{
                        recordId: recordId
                    }
                })
            },
            showMb() {
                this.mbstate = true
            },
            hideMb() {
                this.mbstate = false
            },
            confirmationOfMortgage() {
                if (this.amount==0){
                    this.showTips("抵押金额不能为0")
                    return;
                }else if(this.amount>this.Tokenbalance){
                    this.amount=this.Tokenbalance-this.Tokenbalance%100
                    return;
                }else if(this.amount%100==0){

                }else{
                    this.amount=this.amount-this.amount%100
                    return;
                }
                this.mbstate = false
                this.passwordDigVisible = true
            },
            // 打开消息提示
            showTips(msg) {
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed() {
                this.msg = ''
                this.tipsVisible = false
            },
            // 打开加载
            showLoading() {
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
            },
            // 关闭密码弹窗
            closePasswordDig() {
                this.passwordDigVisible = false;
            },
            // 打开密码弹窗
            openPasswordDig() {
                this.passwordDigVisible = true;
            },
            // 监听关闭密码弹窗事件
            passwordDigClose() {
                this.passwordDigVisible = false;
                this.password = '';
            },
            successfulMortgage(hash){
                var that=this;
                jsonAjax.post(urlUtil.getApiUrl("startPledge"), {
                    userId: this.userId,
                    amount:that.amount,
                    fee:that.gasLimit*that.gasPrice/1000000,
                    orderId:hash
                },function (res) {
                    if (res.returnCode==1){
                        that.Messagelist=res.resultData
                    }
                    console.log( that.Messagelist)
                })
            },
            mortgageList(){
                var that=this;
                jsonAjax.post(urlUtil.getApiUrl("pledgeList"), {
                    userId: this.userId
                },function (res) {
                    if (res.returnCode){
                        that.pledgelist=res.resultData.list
                    }else {

                    }
                })
            },
            //确认储蓄
            checkPassword() {
                var that=this;

                var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                // halle转eth
                // Halletoeth(this.address).then((res) => {
                //     this.toaddress = res
                // })
                if (this.password == "") {
                    this.showTips("密码不能为空")
                    return
                } else if (!regex.test(this.password)) {
                    this.showTips("密码格式错误")
                    return
                }
                this.closePasswordDig()
                this.showLoading()
                Existingaccounts(this.password).then((res) => {
                    this.password = ''
                    // 取私钥
                    getPrivat(this.myaddress).then((res) => {
                        that.sendTransaction(res)
                    })
                }).catch((res) => {
                    that.closeLoading()
                    that.showTips("密码错误")
                })
            },
            // 密码正确调取储蓄接口
            sendTransaction(Private) {
                var that = this;
                this.password = '';
                //合约币转账
                function addPreZero(num) {
                    var t = (num + '').length,
                        s = '';
                    for (var i = 0; i < 64 - t; i++) {
                        s += '0';
                    }
                    return s + num;
                }
                that.web3.eth.getTransactionCount(that.myaddress).then(function (nonce) {
                    // console.log(nonce)
                    var txObject = {
                        from: that.myaddress,
                        nonce: that.web3.utils.toHex(nonce),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
                        gasPrice:that.web3.utils.toHex(that.gasPrice),//"10"),
                        gasLimit: that.web3.utils.toHex(that.gasLimit),
                        to: "0x9e7A7D1fB71dD9F96b42Ff115cd3A44aaE3Ae529",//测试储蓄合约
                        value: '0x00',
                        // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                        // data: '0x' + 'a9059cbb' + addPreZero(that.toaddress.substr(2)) + addPreZero(that.web3.utils.toHex(BigInt  (that.inputAmount*1000000000000000000).toString()).substr(2)),
                        data: '0x1bf6ddae'+addPreZero(that.web3.utils.toHex(BigInt  (that.amount*1000000000000000000).toString()).substr(2)),
                        chainId: 200812
                    };
                    console.log(txObject,"txObject------------")
                    var tx = new Txs(txObject);
                    tx.sign(Buffer.from(Private, 'hex'));
                    var serializedTx = tx.serialize();
                    if (tx.verifySignature()) {
                        console.log('Signature Checks out!')
                    }
                    that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function (hash) {

                    }).on('receipt', function (res) {
                        if (res.status) {
                            that.closeLoading()
                            that.successfulMortgage(res.transactionHash)
                            // that.empty()
                            that.showTips("储蓄成功")
                            setTimeout(function(){
                                that.$router.go(-1)
                            },1200)
                        } else {
                            that.closeLoading()
                            // that.empty()
                            that.showTips("储蓄失败")
                        }
                    });
                })
            }
        }

    }
</script>

<style scoped>
    .DIALOGS {
        height: 4.5rem;
    }
        .text{
            text-align: center;
            font-size: .24rem;
            text-align: center;
            line-height: .6rem;
            color: #333;
        }
    .DIALOG_GE_TITLE {
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        line-height: 1rem;
    }

    .DIALOG_BTNSS {
        margin-top: .3rem;
        height: 1.05rem;
        line-height: 1.05rem;
    }

    .DIALOG_BTNSS > div {
        width: 5rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background: #8E398C;
        color: white;
        border-radius: .5rem;
    }

    .btntop {
        margin-top: 1rem;
    }
    .page{
        overflow: scroll;
    }
    .mb {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99999;
    }

    .mortgagemb {
        border-top-left-radius: .3rem;
        border-top-right-radius: .3rem;
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        background: white;
    }

    .mortgagemb > div:nth-of-type(1) {
        font-size: .3rem;
        font-weight: bold;
        position: relative;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
    }

    .mortgagemb > div:nth-of-type(2) {
        border-bottom: .2rem solid #eeeeee;
        display: flex;
        justify-content: space-between;
        padding: 0 .3rem;
        height: 1rem;
        line-height: 1rem;
        font-size: .3rem;
        font-weight: bold;
    }
    .mortgagemb > div:nth-of-type(4) {
        display: flex;
        justify-content: space-between;
        padding: 0 .3rem;
        height: 1rem;
        line-height: 1rem;
        font-size: .3rem;
        font-weight: bold;
    }
    .mortgagemb > div:nth-of-type(3) {
        padding: 0 .3rem;
    }

    .mortgagemb > div:nth-of-type(3) > div:nth-of-type(1) {
        font-size: .3rem;
        font-weight: bold;
        line-height: .7rem;
    }

    .mortgagemb > div:nth-of-type(3) > input {
        width: 100%;
        height: .9rem;
        line-height: .9rem;
        border: none;
        border-bottom: 1px solid black;
    }

    .mortgagemb > div:nth-of-type(5) {
        width: 5rem;
        height: .8rem;
        line-height: .8rem;
        background: #8E398C;
        color: white;
        font-size: .3rem;
        font-weight: bold;
        text-align: center;
        border-radius: .4rem;
        margin: 0 auto;
        margin-top: 1rem;
        margin-bottom: .5rem;
    }

    .mortgagemb > div:nth-of-type(2) span:nth-of-type(2) {
        color: #8E398C;
    }

    .mortgagemb > div:nth-of-type(1) img {
        width: .3rem;
        height: .3rem;
        position: absolute;
        right: .3rem;
        top: .35rem;
    }

    .mortgageList {
        margin-top: .3rem;
    }

    .HEADER_BACK {
        background: url(../static/images/newWallet/leftwhite.png) no-repeat center center / cover;
    }

    .HEADER_WALLET {
        border: none;
        background:  #9A4192;
    }

    .HEADER_TITLE_WALLET {
        color: white;
    }

    .ff5 {
        background: #F5F5F5;
        height: .7rem;
    }

    .or {
        color: #8E398C;
    }

    .mortgageList > div {
        border-bottom: 1px solid #eee;
        padding: 0 .3rem;
        display: flex;
        height: 1.2rem;
        justify-content: space-between;
    }

    .mortgageList > div > div:nth-of-type(1) {
        color: #333333;
    }

    .mortgageList > div > div:nth-of-type(1) p:nth-of-type(1) {
        margin-top: .2rem;
        font-size: .26rem;
        font-weight: bold;
    }

    .mortgageList > div > div:nth-of-type(1) p:nth-of-type(2) {
        font-size: .22rem;
    }

    .mortgageList > div > div:nth-of-type(2) {
        line-height: 1.2rem;
        font-size: .26rem;
        font-weight: bold;
        display: flex;
    }

    .mortgageList > div > div:nth-of-type(2) img {
        margin-left: .2rem;
        margin-top: .425rem;
        width: .35rem;
        height: .35rem;
    }

    /*.wrapper{*/
    /*    background: #F5F5F5;*/
    /*}*/
    .Mortgaged {
        padding: 0 .3rem;
        box-shadow: 0px 5px 15px 0px rgba(170, 170, 170, 0.1);
        background: white;
        width: 6.3rem;
        position: absolute;
        bottom: -.4rem;
        height: 1.2rem;
        line-height: 1.2rem;
        left: 50%;
        margin-left: -3.45rem;
        display: flex;
        justify-content: space-between;
        border-radius: .3rem;
    }

    .Mortgaged span {
        font-size: .3rem;
        font-weight: bold;
    }

    .Mortgaged div {
        width: 1.5rem;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        color: white;
        margin-top: .3rem;
        font-size: .24rem;
        background: #8E398C;
        box-shadow: 0px .05rem .15rem 0px rgba(230, 130, 30, 0.3);
        border-radius: .25rem;
    }

    .mortgageEntrance {
        padding: 0 .3rem;
        box-shadow: 0px 5px 15px 0px rgba(170, 170, 170, 0.1);
        background: white;
        width: 6.3rem;
        position: absolute;
        bottom: -.9rem;
        height: 1.8rem;
        left: 50%;
        margin-left: -3.45rem;
        display: flex;
        justify-content: space-between;
        border-radius: .3rem;
    }

    .mortgageEntrance div {
        width: 1.5rem;
        text-align: center;
    }

    .mortgageEntrance div p:nth-of-type(1) {
        margin-top: .3rem;
        font-size: .3rem;
        font-weight: bold;
    }

    .mortgageEntrance div p:nth-of-type(2) {
        margin-top: .2rem;
        font-size: .24rem;
        font-weight: bold;
        width: 1.5rem;
        height: .5rem;
        line-height: .5rem;
        background: #8E398C;
        color: white;
        text-align: center;
        border-radius: .4rem;
    }

    .mortgageEntrance img {
        position: absolute;
        top: -.55rem;
        right: -.3rem;
        width: 4.5rem;
        height: 2.8rem;
    }

    .miningmain {
        position: relative;
        height: 3.7rem;
        background: linear-gradient(0deg, #73267E 0%, #9A4192 100%);
        width: 100%;

    }

    .miningmain > .miningMainBox {
        color: white;
        padding-left: .3rem;
        display: flex;
        flex-wrap: wrap;
        position: relative;
    }

    .miningmain > .miningMainBox > div {
        margin-top: .3rem;
        width: 50%;
    }

    .miningmain > .miningMainBox > div > p:nth-of-type(2) {
        margin-top: .15rem;
        font-size: .3rem;
        font-weight: bold;
    }

    .miningmain > .miningMainBox > div > p:nth-of-type(1) {
        font-size: .26rem;
    }
    .LOADING_TXT {
        color: white;
        padding-left: 0.15rem;
        padding-right: .15rem;
    }
</style>
