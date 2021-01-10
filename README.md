# Final BCK work

In order to understand more how Oracle functions work I tried to implement a basic one that return the value of one ETH in USD.
Currently, it only returns an integer number. TODO: Return float with decimals.

## Contracts

- AggregatorInterface.sol => Interface for returning an answer

- OracleETHUSDT.sol => Contract implementation of the Aggregator interface

- ValueInUSDT.sol => This can be any contract that for some reason wants to know the value of ETH/USD. It will use as Oracle function the contract address you pass in the deployment). With this basic examples you can provide an amount of ethers and it will return the value in usd.

### Deployments in Rinkeby network

- Oracle contract(OracleETHUSDT.sol): 0x5f7471A049b94f5703B3293D5866b9b42f0Bed77

- Test example(ValueInUSDT.sol): 0x899a9b225F5e965a96693c82D83856170BBF10f3

## Oracle update

The main idea is to keep updating the price value of the Oracle contract. In order to do that I set a raspberry that runs the script `updatePrice.js` every 30 minutes. This script gets the acutal value of ETH/USD using the CoinGecko API.

Crontab of raspberry pi:

```
30 * * * * /usr/bin/node /home/pi/blockchain/ethoracle/scripts/updateOracle.js > /dev/null
```

## Scripts

- upateOracle.js => update the value ETH/USD of the Oracle contract with the actual value got from CoinGecko api. It exits after 3 block confirmations. (private key to update the contract removed)
- howmanyusd.js => get the value of usd of x ethers. (node howmanyusd.js 3) //will return how much is worth 3 ethers in usd
