const { expectEvent, expectRevert } = require('openzeppelin-test-helpers');
const { BURNER_ROLE, ZERO_ADDRESS } = require('../utils');

require('chai/register-should');

const CMTAT = artifacts.require('CMTAT');

contract('BurnProrata', function ([_, owner, address1, address2, address3, fakeRuleEngine]) {
    beforeEach(async function () {
        this.cmtat = await CMTAT.new({ from: owner });
        this.cmtat.initialize(owner, _, 'CMTA Token', 'CMTAT', 'CMTAT_ISIN', 'https://cmta.ch', { from: owner });
    });

    context('Burn', function () {
        beforeEach(async function () {
            await this.cmtat.mint(address1, 50, { from: owner });
            (await this.cmtat.totalSupply()).should.be.bignumber.equal('50');
            (await this.cmtat.balanceOf(address1)).should.be.bignumber.equal('50');
            await this.cmtat.mint(address2, 50, { from: owner });
            (await this.cmtat.totalSupply()).should.be.bignumber.equal('100');
            (await this.cmtat.balanceOf(address2)).should.be.bignumber.equal('50');
            await this.cmtat.mint(address3, 50, { from: owner });
            (await this.cmtat.totalSupply()).should.be.bignumber.equal('150');
            (await this.cmtat.balanceOf(address3)).should.be.bignumber.equal('50');

        });

        it('can burn a set amount of token through multiple accounts', async function () {

            await this.cmtat.burnProrata([address1, address2, address3], 60, { from: owner });

            (await this.cmtat.totalSupply()).should.be.bignumber.equal('90');

            (await this.cmtat.balanceOf(address1)).should.be.bignumber.equal('30');
            (await this.cmtat.balanceOf(address2)).should.be.bignumber.equal('30');
            (await this.cmtat.balanceOf(address3)).should.be.bignumber.equal('30');
        });
    });
});