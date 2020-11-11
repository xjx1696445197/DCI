<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">兑换</p>
        </div>
        <div class="wrapper">
            <div class="exchanger">
                <div class="exchangerNumber">
                    <div>
                        <img v-if="currency=='IUSDT'" src="../static/images/newWallet/icon_usdi.png">
                        <img v-if="currency=='USDT'" src="../static/images/change/asset_pic002.png">
                        <span>{{currency}}</span>
                        <input type="number" v-model="amount" placeholder="输入兑换数量">
                    </div>
                    <p>余额：{{balance|tofixed6}} {{currency}}</p>
                </div>
                <div class="exchangerImg">
                    <img src="../static/images/newWallet/icon_exchange.png">
                </div>
                <div class="exchangerNumber">
                    <div>
                        <img v-if="currency=='IUSDT'" src="../static/images/change/asset_pic002.png">
                        <img v-if="currency=='USDT'" src="../static/images/newWallet/icon_usdi.png">
                        <span v-if="currency=='USDT'">IUSDT</span>
                        <span v-if="currency=='IUSDT'">USDT</span>
                        <input type="number" v-model="amount" readonly="readonly" placeholder="兑换获得数量">
                    </div>
                </div>
                <p>手续费：{{CurrentlyselectedWallet==1?gasLimit*gasPrice/1000000:gasLimit*gasPrice/1000000000000000000|tofixed6}} {{CurrentlyselectedWallet==1?"HALE":"ETH"}}</p>
                <div>
                    <button @click="exchange">
                        确认兑换
                    </button>
                </div>

            </div>
        </div>
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
                <div class='DIALOG_GE_CONTENT' style="margin-top: .15rem">
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="password"
                                   class="PASSWORD_GE_INPUTS"
                                   placeholder="请输入谷歌验证码"
                                   v-model="googlecode"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_BTNSS'>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto'
                            :class="[isCheckPassword ? 'active' : '']"
                            @click='checkPassword'
                    >确认
                    </div>
                </div>
            </div>
        </nlayer>
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1200"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
                :zIndex="1000"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
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
                <p class="LOADING_TXT">兑换中...</p>
            </div>
        </nlayer>
        <!--无密码设置弹窗-->
        <nlayer
                :visible="noPasswordDigVisible"
                @close="noPasswordDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
                <div class='DIALOG_TITLE'>
                    {{$t('layerdate.layerdate_tips')}}
                </div>
                <div class='DIALOG_CONTENT'>
                    您未设置谷歌验证码，请先去设置谷歌验证码
                </div>
                <div class='DIALOG_BTNS clearfix'>
                    <div
                            class='DIALOG_BTN DEFAULT'
                            @click='closeNoPasswordDig'
                    >取消
                    </div>
                    <div
                            class='DIALOG_BTN CONFIRM'
                            @click='gogoogleverification'
                    >去设置
                    </div>
                </div>
            </div>
        </nlayer>
        <div class="positi">
            USDTd兑换由于链上机制会有延迟，请您不要重复进行转账，否则造成的资产丢失我方无法为您找回，由您个人承担！
        </div>
    </div>
</template>

<script>
    import Nlayer from '@/components/Nlayer'
    import tx from '@/util/txUtil'
    import {getPrivat, Halletoeth, Ethtohelle, Existingaccounts} from '@/util/dip'
    import Web3 from 'web3'
    import md5 from 'js-md5';

    const whilst = require('async/whilst')
    import vueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css'
    import {Derivingmnemonics} from "../util/dip";
    import urlUtil from "../util/apiUtil";
    import axios from 'axios'
    import jsonAjax from '../util/restUtil.js';
    import {tofixed6} from "static/js/untils"
    const Txs = require('ethereumjs-tx');
    export default {
        name: "moneyChanging",
        components: {
            Nlayer,
            vueSlider

        },
        data() {
            return {
                CurrentlyselectedWallet: localStorage.getItem("CurrentlyselectedWallet"),
                balance: "",
                tipsVisible: false,
                contractethpath: this.$route.query.contractethpath,
                currency: this.$route.query.currency,
                myaddress: "",
                web3: {},
                amount: "",
                passwordDigVisible: false,
                password: "",
                googlecode: "",
                isCheckPassword: false,
                loadingVisible: false,
                noPasswordDigVisible: false,
                tips: "",
                halebalance: "",
                ethbalance: "",
                gaslimit:"",
                chainId:"",
                toaddress:"",
                gasLimit:10000,
                gasPrice:436,
                nowTime:"",
                destination:localStorage.getItem("CurrentlyselectedWallet")==1?localStorage.getItem("ethassetaddress"):localStorage.getItem("assetaddress"),
                thousand:1000000,
            }
        },
        watch:{
            amount(newVal) {
                if (this.amount<0){
                    this.amount = 0
                    this.showTips("不可输入负数")
                    return
                }
                if (this.amount>this.balance){
                    this.amount=tofixed6(this.balance)
                    this.showTips("超出余额")

                }
            }
        },
        created() {
            var that = this;
            this.web3 = this.createWeb3()
            if (this.CurrentlyselectedWallet == 1) {
                that.gasLimit=63000
                that.gasPrice=436
                that.toaddress="0x6af926c815df163b305fd83722d0709a789a47b8"
                that.thousand=1000000
                // that.web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));
                that.myaddress = localStorage.getItem("assetaddress")
                that.chainId=200812
                that.web3.eth.getBalance(that.myaddress, function (err, value) {
                    that.halebalance = value / 1000000
                    // console.log(value)
                    if (err) {
                        this.msg = '未获取到余额'
                        // console.warn(err.message)
                        return
                    }

                }.bind(this))
            } else {
                tx.getGasPrice(this.web3, that.myaddress).then((res) => {
                    // console.log(res)
                    that.gasPrice=25000000000
                })
                that.gasLimit=65000
                // tx.getGasLimit(this.web3, that.myaddress).then((res) => {
                //     console.log(res)
                //     that.gasLimit=res
                // })
                that.thousand=1000000000000000000
                that.toaddress="0x148521810FC2f585Ce65058e6BC3CE1Df09B79b0"
                // that.web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalanceeth"))
                that.myaddress = localStorage.getItem("ethassetaddress")
                that.chainId=1
                that.web3.eth.getBalance(that.myaddress, function (err, value) {
                    that.ethbalance = value / 1000000000000000000
                    if (err) {
                        this.msg = '未获取到余额'
                        // console.warn(err.message)
                        return
                    }

                }.bind(this))

            //           tx.getGasLimit(that.web3, that.myaddress).then((res) => {
            // that.gasLimit=res
            // })
            //  tx.getGasPrice(that.web3, that.myaddress).then((res) => {
            //             // that.gasPrice = 436
            //             that.gasPrice = res
            // })
            }
            tx.balanceOf(that.web3, that.myaddress, that.contractethpath).then((res) => {
                if(that.CurrentlyselectedWallet==1){
                    that.balance = res / 1000000000000000000
                }else {
                    that.balance = res / 1000000
                }
            }).catch((res)=>{
                // console.log(res)
            })

        },
        methods: {
           createWeb3() {
                let web3 = {}
                if (this.CurrentlyselectedWallet == 1) {
                 web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalance"));

                } else {
                  web3 = new Web3(Web3.givenProvider || urlUtil.getApiUrl("api_rootbalanceeth"))
                }
                return  web3
            },
            getTime(){
				setInterval(()=>{
					//new Date() new一个data对象，当前日期和时间
					//toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
					this.nowTime = new  Date().getTime()
				},1000)
			},
            //去往谷歌验证
            gogoogleverification() {
                this.$push(
                    {
                        path: "/googleVerification",
                        query: {
                            googleType: 2
                        }
                    })
            },
            // 关闭无密码提示弹窗
            closeNoPasswordDig() {
                this.noPasswordDigVisible = false
            },
            // 打开无密码提示弹窗
            openNoPasswordDig() {
                this.noPasswordDigVisible = true
            },
            // 监听关闭无密码弹窗事件
            noPasswordDigClose() {
                this.noPasswordDigVisible = false
            },
            // 打开加载
            showLoading() {
                // console.log('执行了')
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
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
            // 检测交易密码是否正确
            checkPassword() {
                var that = this;
                var regex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                // halle转eth
                // if (this.currency =="ETH"||this.currency =="USDT"){
                //     this.toaddress=this.address
                // }else {
                //     Halletoeth(this.address).then((res) => {
                //         this.toaddress = res
                //     })
                // }
                if (this.password == "") {
                    this.showTips("密码不能为空")
                    return
                } else if (!regex.test(this.password)) {
                    this.showTips("密码格式错误")
                    return
                } else if (this.googlecode == "") {
                    this.showTips("谷歌验证码不能为空")
                    return;
                } else if (this.googlecode.length !== 6) {
                    this.showTips("填写六位验证码")
                    return;
                }
                this.closePasswordDig()
                this.showLoading()
                this.getTime()
                Existingaccounts(this.password).then((res) => {
                    this.password = ''
                    axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/authDCI", {
                        params: {
                            address: that.myaddress,
                            // address: "0xd41b58e4359df8422d960982ab7d635d22a79f43",
                            passwd: this.googlecode
                        }
                    },).then((res) => {
                        this.googlecode = ''
                        if (res.data) {
                            // 取私钥
                            getPrivat(this.myaddress).then((res) => {
                                that.sendTransaction(res)
                            })
                        } else {
                            that.closeLoading()
                            that.showTips("谷歌验证码错误")
                        }
                    })

                }).catch((res) => {
                    that.closeLoading()
                    that.showTips("密码错误")
                })
            },
            // 关闭密码弹窗
            closePasswordDig() {
                this.passwordDigVisible = false

            },
            // 打开密码弹窗
            openPasswordDig() {
                this.passwordDigVisible = true
            },
            // 监听关闭密码弹窗事件
            passwordDigClose() {
                this.passwordDigVisible = false
                this.password = ''
                this.googlecode = ''

            },
            // 转账成功调后端接口通知兑换
            userExchange(hash) {
                var that = this;
                jsonAjax.post(urlUtil.getApiUrl("userExchange"), {
                    userId: JSON.parse(localStorage.getItem("userinfoall")).customer.customerId,
                    type: that.CurrentlyselectedWallet==1?2:1,
                    origin: that.myaddress,
                    destination: that.destination,//指定地址转账
                    hash: hash,
                    outFee: that.gasLimit*that.gasPrice/that.thousand,
                    amount: that.amount,
                    currency:  that.CurrentlyselectedWallet==1?"IUSDT":"USDT",
                    sign:md5("origin="+that.myaddress+"&hash="+hash+"&destination="+that.destination+"&key="+"A15B6C4353D4D5C9314D738198D68F3B"),
                }, function (result) {
                })
            },
            exchange() {
                    if (localStorage.getItem("ethassetaddress")!==null&&localStorage.getItem("assetaddress")!==null){

                    }else {
                        this.showTips("需分别持有HALE与ETH地址才可兑换")
                        return;
                    }
                if (localStorage.getItem("googleVerification") != 1) {
                    this.openNoPasswordDig()
                    return
                }
                if (this.CurrentlyselectedWallet == 1) {

                    if (Number(this.halebalance) < 63000 * 434.2162396874 / 1000000) {
                        this.showTips("HALE 余额不足")
                        return

                    }
                } else {
                    if (Number(this.ethbalance) < 63000 * 434.2162396874 / 1000000000000000000) {
                        this.showTips("ETH 余额不足")
                        return

                    }
                }
                if (this.amount <= 0) {
                    this.showTips("兑换数量不可以小于0")
                } else {
                    this.openPasswordDig()

                }
            },
            empty() {
                this.amount = ""
            },
            //合约币交易
            sendTransaction(Private) {
                var that = this;
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
                    if (that.CurrentlyselectedWallet==1){
                        var txObject = {
                            from: that.myaddress,
                            nonce: that.web3.utils.toHex(nonce),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
                            gasPrice: that.web3.utils.toHex(that.gasPrice),//"10"),
                            gasLimit: that.web3.utils.toHex(that.gasLimit),
                            to: that.contractethpath,//合约地址
                            value: '0x00',
                            // gas: that.web3.utils.toHex(that.gasPrice * that.gasLimit),
                            // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                            data: '0x' + 'a9059cbb' + addPreZero(that.toaddress.substr(2)) + addPreZero(that.web3.utils.toHex(BigInt(that.amount * 1000000000000000000).toString()).substr(2)),
                            chainId: that.chainId
                        };
                    }else{
                        var txObject = {
                            from: that.myaddress,
                            nonce: that.web3.utils.toHex(nonce),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
                            gasPrice: that.web3.utils.toHex(that.gasPrice),//"10"),
                            // gasLimit: that.web3.utils.toHex(that.gasLimit),
                            to: that.contractethpath,//合约地址
                            value: '0x00',
                            gas: that.web3.utils.toHex(that.gasLimit),
                            // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
                            data: '0x' + 'a9059cbb' + addPreZero(that.toaddress.substr(2)) + addPreZero(that.web3.utils.toHex(BigInt(that.amount * 1000000).toString()).substr(2)),
                            chainId: that.chainId
                        };
                    }

                    // console.log(txObject)
                    var tx = new Txs(txObject);
                    tx.sign(Buffer.from(Private, 'hex'));
                    var serializedTx = tx.serialize();
                    if (tx.verifySignature()) {
                        // console.log('Signature Checks out!')
                    }
                    that.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function (hash) {
                        // console.log("hi " + hash);
                        if(that.currency=="USDT"){
                            if (hash!==""){
                                that.closeLoading()
                                that.userExchange(hash)
                                that.empty()
                                that.showTips("交易成功")
                                setTimeout(function () {
                                    that.$router.go(-1)
                                }, 1200)
                            }
                        }
                    }).on('receipt', function (res) {
                        // console.log(res)
                        if (res.status) {
                            that.closeLoading()
                            that.showTips("交易成功")
                            that.userExchange(res.transactionHash)
                            that.empty()
                            setTimeout(function () {
                                that.$router.go(-1)
                            }, 1200)

                        } else {
                            that.closeLoading()
                            that.empty()
                            that.showTips("交易失败")
                        }
                    });//.on('receipt', console.log);
                }).catch((res)=>{
                    that.closeLoading()
                    that.empty()
                    that.showTips("交易失败")
                })
            },
        }
    }
</script>

<style scoped>
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

    .LOADING_TXT {
        color: white;
        padding-left: 0.15rem;
        padding-right: .15rem;
    }

    .wrapper {
        background: #F5F5F5;
    }

    .exchangerNumber {
        position: relative;
    }

    .exchangerNumber img {
        width: .7rem;
        height: .7rem;
        position: absolute;
        left: .2rem;
        top: 0.15rem;
    }

    .exchangerNumber span {
        font-size: .3rem;
        font-weight: bold;
        display: inline-block;
        line-height: 1rem;
        position: absolute;
        left: 1rem;
        top: 0;
    }

    .exchangerNumber p {
        text-align: right;
        line-height: .6rem;
        font-size: .22rem;
    }

    .exchangerImg {
        width: 100%;

        line-height: 1rem;
        height: 1rem;
    }

    .exchangerImg img {
        margin: 0 auto;
        width: .7rem;
        height: .7rem;
    }

    .exchangerNumber input {
        padding-right: .5rem;
        border-radius: .2rem;
        background: #F5F5F5;
        width: 90%;
        height: 1rem;
        line-height: 1rem;
        text-align: right;
    }

    .exchanger {
        border-radius: .2rem;
        background: white;
        margin: .3rem;
        padding: .3rem;
    }

    .exchanger > div {
        text-align: center;
    }

    .exchanger > p {
        margin-top: .5rem;
        font-size: .26rem;
        font-weight: bold;
    }

    .exchanger button {
        margin-top: .4rem;
        margin-bottom: .2rem;
        width: 5rem;
        color: white;
        height: .8rem;
        line-height: .8rem;
        font-size: .3rem;
        font-weight: bold;
        text-align: center;
        background: #8E398C;
        box-shadow:0px 5px 15px 0px rgba(100, 27, 118, 0.3);
        border-radius: .4rem;
    }
    .positi{
        font-size: .24rem;
        color: #8E398C;
        padding: .3rem;
        position: fixed;
        bottom: .2rem;
    }
</style>
