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
    "0x21C12cb847eB59A89Fa08D2A343A5c888e95111A"
  );

  const attackContractAddress = hre.ethers.utils.getAddress(
    "0x98dff23f6868a1fd19d9bf2269b8ec4200ce8d41"
  );

  const AttackContract = await hre.ethers.getContractFactory("AttackForce");
  const attackContractInstance = AttackContract.attach(attackContractAddress);

  await attackContractInstance
    .connect(owner)
    .forced({ value: hre.ethers.utils.parseEther("0.0009") });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
