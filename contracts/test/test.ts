import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("StakingPool", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOracle() {
        const factory = '0x7E0987E5b3a30e3f2828572Bb659A548460a3003';
        const TDai = '0x315209D528093781ceF9116eF8DE212DA56cf988';
        const TEther = '0x0Cc68AD25AA0172D591F4421666578464ACeA011';

        const [owner] = await ethers.getSigners();
        const PriceOracle = await ethers.getContractFactory("PriceOracleAggregator");
        const oracle = await PriceOracle.deploy(factory, TEther, TDai);

        return oracle;
    };

    describe("deployment", async function () {
        it("ok", async function () {
            const oracle = await loadFixture(deployOracle);
        })
    })
});
