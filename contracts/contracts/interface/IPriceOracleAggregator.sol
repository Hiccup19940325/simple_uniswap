// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity =0.8.20;

interface IPriceOracleAggregator {
    function canUpdate() external view returns (bool);

    function update() external returns (uint);
}
