const Txs = require('ethereumjs-tx');

var Web3 = require('web3');
//var web3 = new Web3(Web3.givenProvider || "http://192.168.3.72:8545");
var web3 = new Web3(Web3.givenProvider || "http://192.168.3.100:8545");
var eth=web3.eth;

var MyTokenABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]


web3.eth.getBlockNumber().then(console.log);


var privateKey1 = Buffer.from('65F43679840DC2312A5208DC52A92789643B354ED5F7C2B371B89EB70CC545FC','hex');//process.env.PRIVATE_KEY_1


var _contract_address = "0xd8729f9070d71d6d134ce663c2a51f0c886ce38b";
var _from = "0x0fde848fe0b52b3b20c51891c56873c65668df84";

//var _contract_address = "0x23bc92c329a8acd0eaeabcd8b96469f3fd41b128";
//var _from = "0x886ae21c0439370891bdf804628def6fbf218f25";


var myContract = new web3.eth.Contract(MyTokenABI,_contract_address); //合约实例
//查询合约名称
myContract.methods.name().call().then(function(result){
    console.log("contract name "+result);
});


// 获得代币名称
myContract.methods.name().call().then(function(error, result){
    if(!error) {
          console.log(result);
    } else {
      console.log(error);
    }
});

// 获取代币符号
myContract.methods.symbol().call().then(function(error, result){
    if(!error) {
      console.log("12321321312",result);
     } else {
      console.log("12321321312",error);
     }
});

// 获取代币总量
myContract.methods.totalSupply().call().then(function(error, result){
    if(!error) {
      console.log(result);
     } else {
      console.log(error);
     }
});

// 查看某个账号的代币数量
myContract.methods.balanceOf(_from).call().then(function(error, result){
    if(!error) {
      console.log(result);
     } else {
      console.log(error);
     }
});
//return


// 补齐64位，不够前面用0补齐
function addPreZero(num){
  var t = (num+'').length,
  s = '';
  for(var i=0; i<64-t; i++){
    s += '0';
  }
  return s+num;
}


    var _to = '0x1f1c8e44731fe5b1d02f78258b213f1481d6354e'
web3.eth.getTransactionCount(_from).then(function(nonce){
console.log("nonce",nonce);
// return

var txObject = {
    from:_from,
    nonce: web3.utils.toHex(41),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
    gasPrice: web3.utils.toHex(6*1000000000000),//"10"),
    gasLimit: web3.utils.toHex(210000),
    to: _contract_address,
    value:'0x00',
    // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
    data: '0x' + 'a9059cbb' + addPreZero(_to.substr(2)) + addPreZero(web3.utils.toHex(100).substr(2)),
    chainId: 200812
};
var tx = new Txs(txObject);
//var tx = new Tx(txObject, {'chain':'8'});
//var tx = new Tx(txObject, 8);
console.log("1  "+web3.utils.toHex(tx.hash()));

tx.sign(privateKey1);
var serializedTx = tx.serialize();
console.log("2  "+web3.utils.toHex(tx.hash()));

if (tx.verifySignature()) {
  console.log('Signature Checks out!')
}


web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('transactionHash', function(hash){
console.log("hi "+hash);
}).on('receipt', console.log);//.on('receipt', console.log);

}
)



//'0xda789b80a5846910058520f8ec211e940785c07b33918d3bd0b2e18cbda58390',
