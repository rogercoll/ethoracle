const Web3 = require("web3");
const fs = require("fs");
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

let web3 = new Web3(
  // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
  new Web3.providers.WebsocketProvider("wss://eth-rinkeby.ws.alchemyapi.io/v2/e8HWgWJ2Blkbm0Y-rxmknv1-GlPWcjyH")
);


const aggregatorV3InterfaceABI = [
			{
				"inputs": [
					{
						"internalType": "string",
						"name": "_maintainer",
						"type": "string"
					}
				],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "newOwner",
						"type": "address"
					}
				],
				"name": "changeOwner",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "latestRoundData",
				"outputs": [
					{
						"internalType": "int256",
						"name": "answer",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "startedAt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "updatedAt",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "maintainer",
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
				"inputs": [
					{
						"internalType": "int256",
						"name": "price",
						"type": "int256"
					}
				],
				"name": "updatePrice",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

async function updatePrice(pubkey, privatekey, contractAddr) {
	web3.eth.accounts.wallet.add(privatekey);
	let data = await CoinGeckoClient.simple.price({
    		ids: ['ethereum'],
    		vs_currencies: ['eur', 'usd'],
	});
	console.log(data.data.ethereum);
	var intprice = Math.floor(data.data.ethereum.usd);
	const contract = new web3.eth.Contract(aggregatorV3InterfaceABI, contractAddr);
	const gasPrice = await web3.eth.getGasPrice();
	const gasEstimate = await contract.methods.updatePrice(intprice).estimateGas({ from: pubkey });
	await contract.methods.updatePrice(intprice).send({from: pubkey, gasPrice: gasPrice, gas: gasEstimate})
	 .on('confirmation', function(confirmationNumber, receipt){
		console.log(confirmationNumber); 
	 })
}

updatePrice("0x84021bcc0b9f37E0267D05d1D1B8346275576968", privkey, "0x5f7471A049b94f5703B3293D5866b9b42f0Bed77");

