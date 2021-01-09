// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "./AggregatorInterface.sol";

contract OracleETHUSDT is AggregatorInterface {
    string public maintainer;
    address private owner;
    int256 private ethusd;
    uint256 private creationTime;
    uint256 private lastupdate;
    
    constructor (string memory _maintainer) public {
        maintainer = _maintainer;
        owner = msg.sender;
        creationTime = block.timestamp;
    }
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function changeOwner(address newOwner) public isOwner {
        owner = newOwner;
    }
    
    function latestRoundData() external view override returns (
              int256 answer,
              uint256 startedAt,
              uint256 updatedAt
        ) {
        return (ethusd, creationTime, lastupdate);
    }
    
    function updatePrice(int256 price) external isOwner {
        ethusd = price;
        lastupdate = block.timestamp;
    }
}
