<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">导入钱包</p>
        </div>
        <div class="wrapper">
            <div class="content">

        <div class="address">
            <div>
                <div>
                    <div class="clola">地址</div>
                    <div v-if="Currentlyselectedcurrency=='HALE'">{{addresslist[1]|addressFormat}}</div>
                    <div v-if="Currentlyselectedcurrency=='ETH'">{{addresslist[2].accounts|addressFormat}}</div>
                </div>
                <div>
                    <div>
                            <div class="clola">当前余额（<span v-if="Currentlyselectedcurrency=='HALE'">HALE</span><span v-if="Currentlyselectedcurrency=='ETH'">ETH</span>）</div>
                            <div>{{balance|tofixed6}}</div>
                    </div>
<!--                    <div>-->
<!--                        <div class="clola">已委托总数（HALE）</div>-->
<!--                        <div>0.000</div>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
                <p><span>*</span>
                    请确认钱包信息是否有误</p>
            </div>
            <div class="btns LONG_WALLET_BTN BUTTON_BGCOLOR_UN mauto tcenter"
                 @click="addressd"
            >确认导入
            </div>
            <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR_UN mauto tcenter"
                 @click="this.$back"
            >返回修改
            </div>
        </div>
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1500"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
    </div>
</template>

<script>
    import Nlayer from '@/components/Nlayer'
    import {sourceUrl} from '@/config'
    import {mapGetters, mapActions} from 'vuex'
    import {ImportWallet} from '../util/dip.js'
    import Web3 from 'web3'
    import urlUtil from "../util/apiUtil";
    import axios from 'axios'

    export default {
        name: "Importaddress",
        components: {
            Nlayer
        },
        data(){
            return {
                addresslist:[],
                tips:"",
                tipsVisible:false,
                web3: {},
                balance:"",
                Currentlyselectedcurrency:localStorage.getItem("Currentlyselectedcurrency")
            }
        },
        mounted(){
            this.addresslist=(this.$route.query.addresslist)
            console.log(this.addresslist)
            if (this.Currentlyselectedcurrency=="HALE"){
                this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalance"));
            }else {
                this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalanceeth"));
            }
            // console.log(this.web3)
            this.getBalance(this.addresslist[2].accounts)
            // localStorage.setItem("googleVerification",0)

        },
        computed: {

        },
        methods: {
            ...mapGetters(['mapGetters','mapActions']),
            //取余额
            getBalance(fromAddress) {
                var that = this;
                const _from = fromAddress;
                const web3 = this.web3
                web3.eth.getBalance(_from, function (err, value) {
                    if (that.Currentlyselectedcurrency=="HALE") {
                        that.balance = value/1000000
                    }else {
                        that.balance = value/1000000000000000000
                    }
                    console.log('-------getBalance-------err--------' + err)
                    console.log('-------getBalance--------value-------' + value)
                    if (err) {
                        this.balance = ''
                        this.msg = '未获取到余额'
                        console.warn(err.message)
                        return
                    }
                }.bind(this))
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
            addressd(){
                var that = this;
                localStorage.setItem("Createdsuccessfully", 1)

                if (localStorage.getItem("Currentlyselectedcurrency") == "HALE") {
                    //halle创建
                    localStorage.setItem("Addressinformation", JSON.stringify([this.addresslist[2]]))
                    localStorage.setItem("assetaddress", this.addresslist[2].accounts)
                    localStorage.setItem("walltname", this.addresslist[2].name)
                    localStorage.setItem("CurrentlyselectedWallet", 1)
                    axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/generateDCI", {
                        params: {address: this.addresslist[2].accounts}
                    },).then((res) => {
                        console.log(res.data.Bind)
                        if (res.data.Bind){
                            localStorage.setItem("googleVerification",1)
                        }else {
                            localStorage.setItem("googleVerification",0)
                        }
                    })
                    // localStorage.setItem("googleVerification",0)

                    if (localStorage.getItem("vaultlist") !== null) {
                        // 添加多钱包
                        var vaultlist = JSON.parse(localStorage.getItem("vaultlist"))
                        vaultlist.push(
                            {
                                name: this.addresslist[2].name,
                                accounts: this.addresslist[2].accounts,
                                active: false,
                                vault: JSON.parse(localStorage.getItem("vault")).vault
                            },
                        )
                        vaultlist.forEach((item, i) => {
                            if (i == vaultlist.length - 1) {
                                item.active = true
                            } else {
                                item.active = false
                            }
                        })
                        localStorage.setItem("vaultlist", JSON.stringify(vaultlist))
                    } else {
                        //第一次创建
                        var vaultlist = [{
                            name: this.addresslist[2].name,
                            accounts: this.addresslist[2].accounts,
                            active: true,
                            vault: JSON.parse(localStorage.getItem("vault")).vault
                        }]
                        localStorage.setItem("vaultlist", JSON.stringify(vaultlist))
                    }
                } else {
                    //eth创建
                    localStorage.setItem("ethAddressinformation", JSON.stringify([this.addresslist[2]]))
                    localStorage.setItem("ethassetaddress", this.addresslist[2].accounts)
                    localStorage.setItem("ethwalltname", this.addresslist[2].name)
                    localStorage.setItem("CurrentlyselectedWallet", 2)
                    // localStorage.setItem("googleVerification",0)

                    axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/generateDCI", {
                        params: {address: this.addresslist[2].accounts}
                    },).then((res) => {
                        console.log(res.data.Bind)
                        if (res.data.Bind){
                            localStorage.setItem("googleVerification",1)
                        }else {
                            localStorage.setItem("googleVerification",0)
                        }

                    })
                    if (localStorage.getItem("ethvaultlist") !== null) {
                        // 添加多钱包
                        var vaultlist = JSON.parse(localStorage.getItem("ethvaultlist"))
                        vaultlist.push(
                            {
                                name: this.addresslist[2].name,
                                accounts: this.addresslist[2].accounts,
                                active: false,
                                vault: JSON.parse(localStorage.getItem("vault")).vault
                            },
                        )
                        vaultlist.forEach((item, i) => {
                            if (i == vaultlist.length - 1) {
                                item.active = true
                            } else {
                                item.active = false
                            }
                        })
                        localStorage.setItem("ethvaultlist", JSON.stringify(vaultlist))
                    } else {
                        //第一次创建
                        var vaultlist = [{
                            name: this.addresslist[2].name,
                            accounts: this.addresslist[2].accounts,
                            active: true,
                            vault: JSON.parse(localStorage.getItem("vault")).vault
                        }]
                        localStorage.setItem("ethvaultlist", JSON.stringify(vaultlist))
                    }
                }
                localStorage.setItem("show", 1)

                this.validationSuccessfulDig = false
                that.showTips("操作成功")
                setTimeout(function () {
                    that.$replace({
                        path: '/asset',
                    })
                }, 1200)
                localStorage.removeItem("Currentlyselectedcurrency")

            }
        }
    }
</script>

<style scoped>
    .btns{

        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: white;
        border: 1px solid #8E398C;
        background: #8E398C;
        margin-top: 5rem;
    }

    .btn {
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #8E398C;
        border: 1px solid #8E398C;
        background: none;
        margin-top: 0.4rem;
    }
    .content{
        padding: .3rem;
    }
    .content>p{
        margin-top: .3rem;
        margin-left: .4rem;
    }
    .content>p>span{
        color: #8E398C;
    }
    .address>div{
        padding: .3rem;
        font-size: .24rem;
        width: 6.3rem;
        height: 1.9rem;
        background: #EEEEEE;
        border-radius: .2rem;
    }
    .address>div>div:nth-of-type(2){
        line-height: .5rem;
        display: flex;
        justify-content: space-between;
    }
    .address>div>div:nth-of-type(1) {
        line-height: .5rem;
    }
    .clola{
        color: #AAAAAA;
    }
</style>
