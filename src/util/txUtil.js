const ethTx = require('ethereumjs-tx');
import confirmedTransaction from '@/util/confirmedTransaction'
//合约
// var MyTokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"setAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
// var MyTokenABI = [{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"uint8","name":"decimalUnits","type":"uint8"},{"internalType":"string","name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
var MyStakingTokenABI =[
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_interest",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_stakeholders",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_rewards",
                "type": "uint256[]"
            }
        ],
        "name": "BatchStakeholderAddRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "_stakeholders",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_rewards",
                "type": "uint256[]"
            }
        ],
        "name": "BatchStakeholderSubRewards",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GetRewards",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "_stakeholders",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_rewards",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "GetStakes",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "_stakeholders",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_stakes",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_stake",
                "type": "uint256"
            }
        ],
        "name": "createStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "interest",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isStakeholder",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "removeStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stakeholder",
                "type": "address"
            }
        ],
        "name": "rewardOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_stakeholder",
                "type": "address"
            }
        ],
        "name": "stakeOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
class tx {
    static newEthTx(txParams) {
        let tx = new ethTx(txParams);
        return tx;
    }

    static strToHexCharCode(str) {
        if (str === "")
            return "";
        var hexCharCode = [];
        hexCharCode.push("0x");
        for (var i = 0; i < str.length; i++) {
            hexCharCode.push((str.charCodeAt(i)).toString(16));
        }
        return hexCharCode.join("");
    }

// 获取limit
    static async getGasLimit(web3, toAddress) {
        //let gasLimit  查询
        let gasLimit = await web3.eth.estimateGas({to: toAddress, data: ''})
        return gasLimit
    }

// 获取limit
    static async getGasPrice(web3, toAddress) {
        // console.log(web3)
        //let gasLimit  查询
        let gasPrice = await web3.eth.getGasPrice()
        return gasPrice
    }

    // 0x1bf6ddae0000000000000000000000000000000000000000000000000000000000000064
    // 0x1bf6ddae00000000000000000000000000000000000000000000000000000000075bcd15
    // 0xa9059cbb000000000000000000000000ce66d456100cb56383e26b28534f670e7fcd99470000000000000000000000000000000000000000000000000de0b6b3a7640000
// 获取合约币余额
    static async balanceOf(web3, myaddress, contractAddress) {
        // console.log(web3,myaddress,contractAddress)
        var balance = ""
        var _from = myaddress;
        var myContract = new web3.eth.Contract(MyStakingTokenABI, contractAddress);
        // console.log(myContract)
        // console.log(myContract.methods.Mint("","").encodeABI())
        await myContract.methods.balanceOf(_from).call().then(function (result, error) {
            if (!error) {
                balance = result;
                // console.log(result)
            } else {
                // console.log(error);
            }
        })

        return balance
    }

    // 获取账号抵押金额
    static async stakeOfs(web3,toAddress) {
        var stakebalance=""
        var myContract = new web3.eth.Contract(MyStakingTokenABI, "0x9e7A7D1fB71dD9F96b42Ff115cd3A44aaE3Ae529");
        await myContract.methods.stakeOf(toAddress).call().then((res) => {
            stakebalance=res / 1000000000000000000
        })
        return stakebalance
    }
    // 获取账号抵押收益
    static async rewardOfs(web3,toAddress) {
        var rewardbalance=""
        var myContract = new web3.eth.Contract(MyStakingTokenABI, "0x9e7A7D1fB71dD9F96b42Ff115cd3A44aaE3Ae529");
        // console.log(myContract,"======myContract===")
        await myContract.methods.rewardOf(toAddress).call().then((res) => {
            // console.log(res)
            rewardbalance=res / 1000000000000000000
        })
        return rewardbalance
    }

// 获取合约币余额
//     static async balanceOfs(web3, toAddress) {
//         var balance = ""
//         // var privateKey1 = Buffer.from('65F43679840DC2312A5208DC52A92789643B354ED5F7C2B371B89EB70CC545FC', 'hex');//process.env.PRIVATE_KEY_1
//         // var _contract_address = "0x9f4c420bd905e91920ddfa402944b9421b37aa67";
//         var _contract_address = "0x7691149B623A92444e8b2c05f18725f7db7F8eD3";
//         // var _contract_address = "0xfdd978c7edfda15e719508cc7ac34df37234c50d";//正式合约
//         var _from = toAddress;
//         var myContract = new web3.eth.Contract(MyTokenABI, _contract_address);
//         await myContract.methods.balanceOf(_from).call().then(function (result, error) {
//             if (!error) {
//                 balance = result;
//                 console.log(result)
//             } else {
//                 console.log(error);
//             }
//         });
//         return balance
//     }

    // 发起HALE交易
    static async sendTransaction(web3, txParams) {
        console.dir(txParams)
        let privateKey1 = Buffer.from(txParams.Private, 'hex');//process.env.PRIVATE_KEY_1

        var _from = txParams.from;

        let lastBlockNumber = await web3.eth.getBlockNumber()
        let nonce = await web3.eth.getTransactionCount(_from)
        // console.log("------nonce-------- " + nonce);
        let inPutGas = txParams.inPutGas
        let gasPrice = txParams.gasPrice
        console.dir(gasPrice, "==gasPrice==")
        // console.log("------inPutGas-------- " + inPutGas);
        // console.log(txParams.from)
        let gasLimit = await web3.eth.estimateGas({to: txParams.to, from: txParams.from, data: ''})
        // console.log("------gasLimit-------- ", gasLimit);
        // let txValue =  web3.utils.toWei(txParams.value, "ether") ;
        let txValue = txParams.value * 1000000;//10^6

        // txValue = web3.utils.numberToHex(web3.utils.toWei(txParams.value, "ether"));
        // gasPrice = web3.utils.toHex(web3.utils.toWei('1','gwei'));
        // let	gasLimit = web3.utils.toHex(10);

        let memo = this.strToHexCharCode(txParams.data)
        // console.log(gasLimit)
        var rawTx = {
            from: _from,
            nonce: nonce,
            gasPrice: txParams.gasPrice,
            gasLimit: txParams.gasLimit,
            to: txParams.to,
            value: web3.utils.numberToHex(txValue),
            data: '0x',
            // gas: web3.utils.toHex(inPutGas),
            // chainId: 8,//测试
            chainId: txParams.chainId,

        }
        // console.log(rawTx)
        //需要将交易的数据进行预估gas计算，然后将gas值设置到数据参数中
        // let gas = await web3.eth.estimateGas(rawTx)
        // rawTx.gas = gas

        //创建交易并签名
        console.dir(rawTx, "rawTx")
        var tx = new ethTx(rawTx);
        tx.sign(privateKey1);

        var serializedTx = tx.serialize();
        // console.log(('0x' + serializedTx.toString('hex')), "serializedTx")
        let txId = ''
        let a = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, data) {
            if (err) {
                console.warn("---txUtil----sendSignedTransaction-------err:" + err);
            } else {
                // console.log("---txUtil----sendSignedTransaction-------data");
                // console.log(data);
                txId = data
            }

        })
        // console.log(a, "___________")
        if (txId != '') {
            //let blockNumber = await web3.eth.getBlockNumber()
            let result = {
                "result": "succ",
                "msg": "交易成功",
                "txHash": txId,
                "lastBlockNumber": lastBlockNumber
            }
            return result

        } else {
            let result = {
                "result": "err",
                "msg": "交易失败"
            };
            return result
        }
    }
}

export default tx
