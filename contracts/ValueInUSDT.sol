pragma solidity ^0.6.7;

import "https://github.com/rogercoll/ethoracle/AggregatorInterface.sol";

contract ValueInUSDT {

    AggregatorInterface internal priceFeed;

    /**
     * Network: Rinkeby
     * Aggregator: ETH/USD
     * Address: 0x5f7471A049b94f5703B3293D5866b9b42f0Bed77
     */
    constructor() public {
        priceFeed = AggregatorInterface(0x5f7471A049b94f5703B3293D5866b9b42f0Bed77);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() internal view returns (int) {
        (
            int price,
            uint startedAt,
            uint timeStamp
        ) = priceFeed.latestRoundData();
        return price;
    }
    
    function inUSDT(int256 eths) public view returns (int) {
        return eths*getLatestPrice();
    }   
}
