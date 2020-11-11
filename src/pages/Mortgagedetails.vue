
<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">储蓄详情</p>
            <div
                    class="HEADER_RIGHT"
                    @click="go('Revenuerecords')"
            >收益记录</div>
        </div>
        <!--        <div class="HEADER">-->
        <!--            <div class="HEADER_BACK" @click="this.$back"></div>-->
        <!--            <p class="HEADER_TITLE">{{querys.currencyName}}{{dealName}}</p>-->
        <!--            <div-->
        <!--                    class="HEADER_RIGHT share"-->
        <!--                    @click="downloadPic('share')"-->
        <!--            ></div>-->
        <!--        </div>-->
        <div class="wrapper">
            <div class="content">
                <div class="main">
                    <div class="detail_top tcenter"
                         :class="[1 == 0   ? 'state1' : 'state2']"
                    >
                        <div class="mauto radius-round detail_icon" :class="detail.pledgeType==1?'detail_icon':'detail_iconok'"></div>
                        <p class="detail_txt1">{{detail.amountPledge|tofixed4}} IUSDT</p>
                        <p class="detail_txt2"><span v-if="detail.pledgeType==1">储蓄进行中</span><span v-if="detail.pledgeType==2">储蓄已结束</span></p>

                    </div>
                    <div class="he">

                    </div>
                    <div class="detail_list">
                        <div class="detail_item">
                            <p class="detail_item_txt1">
                                储蓄数量：
                            </p>
                            <p class="detail_item_txt2">
                                {{detail.amountPledge|tofixed4}} IUSDT
                            </p>
                        </div>
                        <div class="detail_item">
                            <p class="detail_item_txt1"> 手续费：</p>
                            <p class="detail_item_txt2">{{detail.feeStart|tofixed4}}HALE</p>
                        </div>
                        <div class="detail_item">
                            <p class="detail_item_txt1">储蓄时间：</p>
                            <p class="detail_item_txt2">{{detail.startTime|dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                        </div>
                        <div class="detail_item">
                            <p class="detail_item_txt1">已获得收益：</p>
                            <p class="detail_item_txt2">{{detail.pledgeIncomeTotal|tofixed4}} DCI</p>
                        </div>
                        <div class="detail_item">
                            <p class="de.detail_item_txt2tail_item_txt1">已储蓄天数：</p>
                            <p class="detail_item_txt2">{{detail.pledgeDay}} 天</p>
                        </div>

<!--                        <div class="detail_item">-->
<!--                            <p class="detail_item_txt1">{{$t('currencyDetail.currencyDetail_fee')}}</p>-->
<!--                            <p class="detail_item_txt2">{{detail.messages[0].value.gas*detail.messages[0].value.gasPrice/1000000 || '&#45;&#45;&#45;&#45;&#45;&#45;'}} HALE</p>-->
<!--                        </div>-->

                        <!-- <div class="detail_item">
                            <p class="detail_item_txt1">备注</p>
                            <p class="detail_item_txt2">{{detail.memo || '无'}}</p>
                        </div> -->

                    </div>
                </div>
            </div>
            <div class="centers">
                每日00:00:00-02:00:00为收益结算时间，期间请不要操作结束储蓄操作，否则造成的收益不到账由您自行承担！
            </div>
            <div class="padding_top LONGBTN" @click="Terminationofmortgage"  v-if="detail.pledgeType==1">结束储蓄</div>
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

<!--        <nlayer-->
<!--                :maskCancel="true"-->
<!--                maskBackgroundColor="rgba(0,0,0,0.4)"-->
<!--                :visible="actionSheetVisible"-->
<!--                @close="actionSheetClosed"-->
<!--                class="ANIMATITE_BOTTOM_TO_TOP"-->
<!--                width="100%"-->
<!--        >-->
<!--            <div class="actionSheet">-->
<!--                <div class="actionSheet_container">-->
<!--                    <div class="actionSheet_list">-->
<!--                        <div class="actionSheet_item"-->
<!--                             v-for="(item, index) in buttons"-->
<!--                             @click="selectActionSheet(index)"-->
<!--                        >-->
<!--                            <div class="actionSheet_item_icon"-->
<!--                                 :style="{'background':`url(${item.icon}) no-repeat center center / cover`}"-->
<!--                            ></div>-->
<!--                            <p class="actionSheet_item_txt1">{{item.title}}</p>-->
<!--                        </div>-->


<!--                    </div>-->
<!--                </div>-->
<!--                <div class="actionSheet_button" @click="closeActionSheet">{{$t('layerdate.layerdate_btnCancel')}}</div>-->
<!--            </div>-->
<!--        </nlayer>-->
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
                <p class="LOADING_TXT">取消储蓄中...</p>
            </div>
        </nlayer>
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
        <div class="mb"  v-if="mbstart">
        <div>
            <P>提示</P>
            <p>
                <span>
                    已获得收益：
                </span>
                <span>
                    {{detail.pledgeIncomeTotal|tofixed4}} DCI
                </span>
            </p>
            <p>
                <span>
                    已储蓄天数：
                </span>
                <span>
                    {{detail.pledgeDay}}天
                </span>
            </p>
            <p>
                <span>
                    手续费：
                </span>
                <span>
                   {{gasLimit*gasPrice/1000000}}HALE
                </span>
            </p>
            <div @click="Endconfirmation">确认结束</div>
        </div>
        </div>
    </div>
</template>

<script>
    // <!--// id 详情id-->
    // <!--// newsId 已读设置-->
    // <!--// currencyName 币名称-->
    // <!--// dealName 交易类型-->
    // <!--// dealResState 交易结果类型-->

    import icon001 from 'static/images/action_icon001.png'
    import icon002 from 'static/images/action_icon002.png'
    import {getPrivat, Halletoeth, Ethtohelle, Existingaccounts} from '@/util/dip'
    const Txs = require('ethereumjs-tx');
    import tx from '@/util/txUtil'

    import { mapGetters, mapActions } from 'vuex'

    import { sourceUrl } from '@/config'

    import Nlayer from '@/components/Nlayer'
    import jsonAjax from "../util/restUtil";
    import urlUtil from "../util/apiUtil";
    import Web3 from "web3";

    export default {
        name: "CurrencyDealDetail",
        components: {
            Nlayer
        },
        data(){
            return {
                detail: {},
                sourceUrl,
                actionSheetVisible: false,
                isCheckPassword: "",
                tips: '',
                loadingVisible: false,
                tipsVisible: false,
                dtask: '',
                FILENAME: '',
                shareWX: null,
                myaddress:"",
                currency:this.$route.query.currency,
                recordId:this.$route.query.recordId,
                passwordDigVisible: false,
                password:"",
                web3: {},
                gasLimit:5000000,
                gasPrice:2,
                mbstart:false

            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            },
            querys(){
                return this.$route.query
            },
        },
        mounted(){
            var that=this;
            this.myaddress =localStorage.getItem("assetaddress")
            this.web3 = this.createWeb3()
            this.pledgeDetail()

        },
        methods: {
            ...mapActions(['setUserNoticeState']),
            ...mapGetters(['getUserinfo']),
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
            //初始化web3
            createWeb3() {
                let web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));
                return web3
            },
            // 密码正确调取取消储蓄接口
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
                        gasPrice: that.gasPrice,//"10"),
                        gasLimit: that.web3.utils.toHex(that.gasLimit),
                        to: "0x9e7A7D1fB71dD9F96b42Ff115cd3A44aaE3Ae529",//测试储蓄合约
                        value: '0x00',
                        // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                        data: "0x9c91b779",
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
                            console.log(res.transactionHash,"transactionHashtransactionHash========")
                            that.closeLoading()
                            that.cancellationMortgage(res.transactionHash)
                            // that.empty()
                            that.showTips("取消储蓄成功")
                            setTimeout(function(){
                                that.$router.go(-1)
                            },1200)
                        } else {
                            that.closeLoading()
                            // that.empty()
                            that.showTips("取消储蓄失败")
                        }
                    });
                })
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
            // 监听关闭密码弹窗事件
            passwordDigClose() {
                this.passwordDigVisible = false;
                this.password = '';
            },
            // 打开密码弹窗
            openPasswordDig() {
                this.passwordDigVisible = true;
            },
            go(url){
                this.$push({
                    path: '/'+url,
                    query:{
                        recordId:this.recordId
                    }
                })
            },
            Endconfirmation(){
                this.mbstart=false;
                this.openPasswordDig()
            },
            Terminationofmortgage(){
                this.mbstart=true;
            },
            cancellationMortgage(hash){
                var that=this;
                jsonAjax.post(urlUtil.getApiUrl("endPledge"), {
                    userId: this.userId,
                    recordId:this.recordId,
                    fee:10,
                    orderId:hash
                },function (res) {

                })
            },
            pledgeDetail(){
                var that=this;
                jsonAjax.post(urlUtil.getApiUrl("pledgeDetail"), {
                    userId: this.userId,
                    recordId:this.recordId,
                },function (res) {
                    if (res.returnCode==1){
                        that.detail=res.resultData
                    }

                })
            },

            // 监听actionSheet关闭
            actionSheetClosed(){
                this.actionSheetVisible = false
            },
            // 打开actionSheet
            showActionSheet(){
                this.actionSheetVisible = true
            },
            // 关闭actionSheet
            closeActionSheet(){
                this.actionSheetVisible = false
            },
            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            }
        }
    }
</script>

<style scoped>
        .centers{
            padding: .3rem;
            font-size: .24rem;
            color: #8E398C;
        }
    .mb {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
    }
    .mb>div{
        color: #333;
        border-radius: .3rem;
        width: 5.4rem;
        height: 4rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -2.3rem;
        margin-left: -3rem;
        background: white;
        padding: .3rem;
    }
    .mb>div>p:nth-of-type(1){
        text-align: center;
        line-height: .8rem;
        font-size: .3rem;
        font-weight: bold;
    }
    .mb>div>p:nth-of-type(2){
        line-height: .6rem;
        display: flex;
        justify-content: space-between;
    }
    .mb>div>p:nth-of-type(3){
        line-height: .6rem;
        display: flex;
        justify-content: space-between;
    }
    .mb>div>p:nth-of-type(4){
        line-height: .6rem;
        display: flex;
        justify-content: space-between;
    }
    .mb>div>div{
        margin: 0 auto;
        margin-top: .6rem;
        width: 2.1rem;
        height: .6rem;
        line-height: .6rem;
        background: #8E398C;
        text-align: center;
        color: white;
        border-radius: .4rem;
    }
    .DIALOGS {
        height: 4.5rem;
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
    .padding_top{
        margin-top: 1rem;
    }
    .actionSheet{
        background: #fff;
    }
    .actionSheet_container{
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        overflow-scrolling: touch;
    }
    .actionSheet_list{
        display: flex;
        padding: 0 0.2rem;
    }
    .actionSheet_item{
        display: flex;
        padding: 0.5rem 0.25rem;
        flex-direction: column;
        align-items: center;
    }
    .actionSheet_item_icon{
        width: 0.8rem;
        height: 0.8rem;
        background: #000;
        border-radius: 100%;
    }
    .actionSheet_item_txt1{
        font-size: 0.24rem;
        color:  #070707; line-height: 0.4rem;
        margin-top: 0.2rem;
        white-space: nowrap;
    }
    .actionSheet_button{
        font-size: 0.32rem;
        color:  #070707; line-height: 0.9rem;
        border-top: 1px solid #f3f3f3;
        text-align: center;
    }
    .wrapper{
        background: white;
        overflow-y: scroll;
        overflow-x: hidden;
        overflow-scrolling: touch;
    }
    .share{ width: 0.6rem;
        height: 0.6rem;background: url("../static/images/icon/share_icon.png") no-repeat center center / cover;
    }
    .content{
    }
    .main{
        /*box-shadow: 0 0.05rem 0.15rem rgba(102,102,102,0.1);*/
        border-radius: 0.2rem;
        padding: .65rem 0rem;
    }
    .detail_top.state1 .detail_icon{
        background: url("../static/images/newWallet/icon_seccus.png") no-repeat center center / cover;
    }
    .detail_list{
        padding: 0 .24rem;
    }
    .detail_top.state2 .detail_icon{
        background: url("../static/images/newWallet/icon_jxz.png") no-repeat center center / cover;
    }
    .detail_top.state2 .detail_iconok{
        background: url("../static/images/newWallet/icon_ok.png") no-repeat center center / cover;
    }
    .detail_top.state2 .detail_txt2{
        color: #333333;
        font-size: .26rem;
        font-weight: bold;
    }
    .detail_icon{
        width: 1.2rem;
        height: 1.2rem;
    }
    .detail_txt1{
        font-size: .3rem;
        color:  #AAAAAA;
        line-height: .6rem;
        margin-top: 0.25rem;
    }
    .detail_txt2{
        font-size: .3rem;
        color: #8E398C;
        line-height: .45rem;
        margin-bottom: .2rem;
    }
    .detail_item{
        color: #333333;
        display: flex;
        padding: .24rem 0 .18rem;
        line-height: .5rem;
        justify-content: space-between;
    }
    .detail_item>p{
        line-height: .5rem;

    }
    .detail_item>p:nth-of-type(1){
        width: 2rem;

    }
    .detail_item>p:nth-of-type(2){
        text-align: right;
        word-break:break-all;
        width: 5rem;
    }
    .detail_item+.detail_item {
    }
    .detail_item_txt1{
        font-size: .3rem;
        color:  #070707;
        line-height: .45rem;
    }
    .detail_item_txt2{
        font-size: .26rem;
        color: #070707;
        line-height: .3rem;
        word-wrap: break-word;
    }
    .he{
        height: .2rem;
        background: #F5F5F5;
    }
    .green{
        color: #22AC38;
    }
</style>
