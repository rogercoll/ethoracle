const Web3 = require("web3");
const fs = require("fs");

let web3 = new Web3(
  // Replace YOUR-PROJECT-ID with a Project ID from your Infura Dashboard
  new Web3.providers.WebsocketProvider("wss://eth-rinkeby.ws.alchemyapi.io/v2/e8HWgWJ2Blkbm0Y-rxmknv1-GlPWcjyH")
);


const valueABI = [
			{
				"inputs": [],
				"stateMutability": "nonpayable",
				"type": "constructor"
			},
			{
				"inputs": [
					{
						"internalType": "int256",
						"name": "eths",
						"type": "int256"
					}
				],
				"name": "inUSDT",
				"outputs": [
					{
						"internalType": "int256",
						"name": "",
						"type": "int256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			}
		];

async function getPrice() {
const addr = "0x899a9b225F5e965a96693c82D83856170BBF10f3";
try {
	var args = process.argv.slice(2);
	const priceFeed = new web3.eth.Contract(valueABI, addr);
	priceFeed.methods.inUSDT(parseInt(args)).call()
    	.then((roundData) => {
        // Do something with roundData
        console.log("Price in usd:", roundData)
    });
} catch (e) {
	console.log(e)
}
}

getPrice();
