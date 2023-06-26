const { log } = require("console");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  // Get the ContractFactories and Signers here.
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");
  // deploy contracts
  const marketplace = await Marketplace.deploy(1);
  const nft = await NFT.deploy();

  console.log("NFT address:", nft.address);
 console.log("Marketplace address:", marketplace.address);

  // Save copies of each contracts abi and address to the frontend.
 saveFrontendFiles(marketplace , "Marketplace");
  saveFrontendFiles(nft , "NFT");
}
//const contract=await ethers.getContractAt("NFT","0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
//const marketplace=await ethers.getContractAt("Marketplace","0x5FbDB2315678afecb367f032d93F642f64180aa3")

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });