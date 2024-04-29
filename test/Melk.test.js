// test/Melk.test.js

// Load dependencies
const { ethers } = require("hardhat");
const { expect } = require('chai');

async function deployMelk() {
  const Melk = await ethers.getContractFactory("Melk");
  const contract = await Melk.deploy();
  await contract.deployed();
  return contract;
}

describe('Melk', function() {
    beforeEach(async function() {
        // Deploy a new Melk contract for each test
        this.contract = await deployMelk();
        this.signers = await ethers.getSigners();
    });

    describe("Meta Data", function() {
        it('name is Melk', async function() {
            expect(await this.contract.name()).to.equal('Melk');
        });
        it('symbol is Melk', async function() {
            expect(await this.contract.symbol()).to.equal('MELK');
        });
        it('decimals is 18', async function() {
            expect(await this.contract.decimals()).to.be.equals(18);
        });
    });

    describe("Deployment", function() {
        it('deployer is admin', async function() {
            const [owner] = this.signers;
            let role = '0x0000000000000000000000000000000000000000000000000000000000000000';
            expect(await this.contract.hasRole(role, owner.address)).to.equal(true);
        });
        it('deployer is minter', async function() {
            const [owner] = this.signers;
            let role = await this.contract.MINTER_ROLE();
            expect(await this.contract.hasRole(role, owner.address)).to.equal(true);
        });
        it('deployer is pauser', async function() {
            const [owner] = this.signers;
            let role = await this.contract.PAUSER_ROLE();
            expect(await this.contract.hasRole(role, owner.address)).to.equal(true);
        });
    });

    it("should allow the admin to pause and unpause the contract", async function() {
      await this.contract.pause();
      let isPaused = await this.contract.paused();
      expect(isPaused).to.equal(true);

      await this.contract.unpause();
      isPaused = await this.contract.paused();
      expect(isPaused).to.equal(false);
    });

    it("should not allow not admin to pause and unpause the contract", async function() {
      const [_admin, notAdmin] = this.signers;
      await expect(this.contract.connect(notAdmin).pause()).to.be.revertedWith("AccessControlUnauthorizedAccount");
      await expect(this.contract.connect(notAdmin).unpause()).to.be.revertedWith("AccessControlUnauthorizedAccount");
    });

    it('mints 10,000,000 tokens', async function() {
        expect((await this.contract.totalSupply())).to.be.equals('10000000000000000000000000');
    });
});