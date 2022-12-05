const hre = require("hardhat");

async function main() {
  const contractAddress = hre.ethers.utils.getAddress(
    "0xef07aAec29d26F24d7420f4e822D2737188064e5"
  );
  const Contract = await hre.ethers.getContractFactory("HelloEthernaut");
  const contractInstance = await Contract.attach(contractAddress);

  //console.log(contractInstance);
  const password = await contractInstance.password();
  console.log("password :", password);

  await contractInstance.authenticate(password);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
