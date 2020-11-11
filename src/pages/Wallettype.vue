<template>
    <div class="page">

        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">选择钱包类型</p>

        </div>
        <div class="wrapper">
            <div class="walletTypeList" @click="toWallet('HALE')">
                <div>
                    <img src="../static/images/newWallet/icon_HALE2.png">
                    <span>HALE</span>
                </div>
                <img src="../static/images/newWallet/go.png">
            </div>
            <div class="walletTypeList" @click="toWallet('ETH')">
                <div>
                    <img src="../static/images/newWallet/eth.png">
                    <span>ETH</span>
                </div>
                <img src="../static/images/newWallet/go.png">
            </div>
        </div>
        <div class="mb" v-if="tipss">
            <div class="tips">
                <div>
                    提示
                </div>
                <div>
                    {{tiptext}}
                </div>
                <div @click="closetip">
                    确定
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Wallettype",
        data() {
            return {
                type: this.$route.query.type,
                tipss: false,
                tiptext: ""
            }
        },
        methods: {
            toWallet(curreny) {
                if (curreny == "HALE") {
                    if (JSON.parse(localStorage.getItem("userinfoall")).haleAddress == "") {
                        if (this.type == 1) {
                            this.$push({
                                path: '/walletCreate'
                            })
                            localStorage.setItem("Currentlyselectedcurrency", curreny)

                        } else {
                            this.tipss = true
                            this.tiptext = "当前账号下无绑定此钱包，请用前往创建钱包。"
                        }
                    } else {
                        if (this.type == 2) {
                            this.$push({
                                path: '/walletImport'
                            })
                            localStorage.setItem("Currentlyselectedcurrency", curreny)

                        } else {
                            this.tipss = true
                            this.tiptext = "当前账号下已绑定此钱包，请用备份的助记词导入钱包。"

                        }
                    }
                } else {
                    if (JSON.parse(localStorage.getItem("userinfoall")).ethAddress == "") {
                        if (this.type == 1) {
                            this.$push({
                                path: '/walletCreate'
                            })
                            localStorage.setItem("Currentlyselectedcurrency", curreny)

                        } else {
                            this.tipss = true
                            this.tiptext = "当前账号下无绑定此钱包，请用前往创建钱包。"
                        }
                    } else {
                        if (this.type == 2) {
                            this.$push({
                                path: '/walletImport'
                            })
                            localStorage.setItem("Currentlyselectedcurrency", curreny)
                        } else {
                            this.tipss = true
                            this.tiptext = "当前账号下已绑定此钱包，请用备份的助记词导入钱包。"
                        }

                    }
                }
            },
            closetip() {
                this.tipss = false
            }
        }
    }
</script>

<style scoped>
    .mb {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99999;
    }

    .tips {
        width: 6rem;
        height: 3.5rem;
        background: white;
        border-radius: .3rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -3rem;
        margin-top: -1.75rem;
    }

    .tips > div:nth-of-type(1) {
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
    }

    .tips > div:nth-of-type(2) {
        padding: 0 .3rem;
        text-align: center;
        color: #070707;
        font-size: .26rem;
    }

    .tips > div:nth-of-type(3) {
        width: 2.1rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .24rem;
        margin: 0 auto;
        margin-top: .5rem;
        box-shadow: 0px 5px 15px 0px rgba(100, 27, 118, 0.3);
        color: white;
        background: #8E398C;
        border-radius: .3rem;
    }

    .wrapper {
        background: #F5F5F5;
    }

    .walletTypeList {
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

    .walletTypeList div {
        display: flex;

    }

    .walletTypeList > div > img {
        width: 1rem;
        height: 1rem;
        margin-top: .4rem;
    }

    .walletTypeList > div > span {
        color: #070707;
        font-size: .34rem;
        font-weight: bold;
        margin-left: .3rem;
    }

    .walletTypeList > img {
        margin-right: .1rem;
        width: .5rem;
        height: .5rem;
        margin-top: .65rem;
    }
</style>
