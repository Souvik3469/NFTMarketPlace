const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTMarketplace", function () {

   let marketplace;
  let deployer;
  let addr1;
  let addr2;
   let feePercent = 1;
 

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    NFT = await ethers.getContractFactory("NFT");
    Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer, addr1, addr2] = await ethers.getSigners();

    // To deploy our contracts
    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployment", function () {

    it("Should track name and symbol of the nft collection", async function () {
      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const nftName = "DApp NFT"
      const nftSymbol = "DAPP"
      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should track feeAccount and feePercent of the marketplace", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

})