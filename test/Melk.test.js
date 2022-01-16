// test/Melk.test.js

// Load dependencies
const { expect } = require('chai');
const chai = require('chai');
const BN = require('bn.js');
// Enable and inject BN dependency
chai.use(require('chai-bn')(BN));

// Load compiled artifacts
const Melk = artifacts.require('Melk');

describe('Melk', function() {
    let accounts;

    before(async function() {
        accounts = await web3.eth.getAccounts();
        this.owner = accounts[0]
    });

    beforeEach(async function() {
        // Deploy a new Melk contract for each test
        this.contract = await Melk.new({ from: this.owner });
    });

    describe("Meta Data", function() {
        it('name is Melk', async function() {
            expect(await this.contract.name()).to.equal('Melk');
        });
        it('symbol is Melk', async function() {
            expect(await this.contract.symbol()).to.equal('MELK');
        });
        it('decimals is 18', async function() {
            expect(await this.contract.decimals()).to.be.bignumber.that.equals('18');
        });
    });

    describe("Deployment", function() {
        it('deployer is admin', async function() {
            let role = '0x0000000000000000000000000000000000000000000000000000000000000000';
            expect(await this.contract.hasRole(role, this.owner)).to.equal(true);
        });
        it('deployer is minter', async function() {
            let role = web3.utils.soliditySha3('MINTER_ROLE')
            expect(await this.contract.hasRole(role, this.owner)).to.equal(true);
        });
        it('deployer is pauser', async function() {
            let role = web3.utils.soliditySha3('PAUSER_ROLE')
            expect(await this.contract.hasRole(role, this.owner)).to.equal(true);
        });
    });

    it('mints 10000000 tokens', async function() {
        expect((await this.contract.totalSupply())).to.be.bignumber.that.equals('10000000000000000000000000');
    });
});