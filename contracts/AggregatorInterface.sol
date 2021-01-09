// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

interface AggregatorInterface {

        function latestRoundData() external view returns (
              int256 answer,
              uint256 startedAt,
              uint256 updatedAt
        );
}

