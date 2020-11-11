const Tx = require('ethereumjs-tx');

var Web3 = require('web3');
//var web3 = new Web3(Web3.givenProvider || "http://192.168.3.72:8545");
var web3 = new Web3(Web3.givenProvider || "http://192.168.3.100:8545");
var eth=web3.eth;

var MyTokenABI=[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialAmount","type":"uint256"},{"name":"_tokenName","type":"string"},{"name":"_decimalUnits","type":"uint8"},{"name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]


web3.eth.getBlockNumber().then(console.log);


var privateKey1 = Buffer.from('6A387E24E7AC5870B1218E21F5F84E71B8E066F574B036ECE4A6008BF1B45BC6','hex');//process.env.PRIVATE_KEY_1


var _contract_address = "0x04e09a4e202e7bcf1e25f2d1d66fea0a635497c1";
var _from = "0x3691011152c50c63f34a8cfd0b8b611e91e40306";

//var _contract_address = "0x23bc92c329a8acd0eaeabcd8b96469f3fd41b128";
//var _from = "0x886ae21c0439370891bdf804628def6fbf218f25";


var myContract = new web3.eth.Contract(MyTokenABI,_contract_address); //合约实例
//查询合约名称
//contract.methods.name().call().then(function(result){
//    console.log("contract name "+result);
//});


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
      console.log(result);
     } else {
      console.log(error);
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

// 查看某个账号允许另一个账号可使用的代币数量
myContract.methods.balanceOf(_from).call().then(function(error, result){
    if(!error) {
      console.log(result);
     } else {
      console.log(error);
     }
});



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
//return

var txObject = {
    from:_from,
    nonce: web3.utils.toHex(11),//web3.utils.toHex(web3.eth.getTransactionCount(from)),
    gasPrice: web3.utils.toHex(6*1000000000000),//"10"),
    gasLimit: web3.utils.toHex(210000),
    to: _contract_address,
    value:'0x00',
    // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
    data: '0x' + 'a9059cbb' + addPreZero(_to.substr(2)) + addPreZero(web3.utils.toHex(100).substr(2)),
    chainId: 200812
};
var tx = new Tx(txObject);
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



//4CAC2CD4654D4424F25773FDC38BDAA5593BAD3672C9884D99CB4A9F0CA3ED8E
//5EAFA62ABF024DA43A2D4FA0D852BB5DEC64E2C348241652BE216767564AF997
//I[2020-08-21|15:42:54.226] Added good transaction                       module=mempool tx=DFE88D44071C1E14A9D8853572238504820D1192B52ED75474BF8860D59CA7BE res="&{CheckTx:log:\"[]\" gas_wanted:24000 gas_used:22872 }" height=47885 total=1
