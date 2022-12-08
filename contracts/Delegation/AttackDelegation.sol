// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackDelegation {
    function getsignature() public pure returns (bytes memory) {
        return abi.encodeWithSignature("pwn()");
    }
}
