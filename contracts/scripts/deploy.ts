import hre, { ethers } from "hardhat";
import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

async function main() {

  const TEther = '0x0Cc68AD25AA0172D591F4421666578464ACeA011'
  const TLink = '0x85Fc75a248E68d3E32434e00350cBB363adaeb36'
  const TAave = '0x43eAA6C3A3456f3C87f669dB9650Dd49E9C415D3'
  const TDai = '0x315209D528093781ceF9116eF8DE212DA56cf988'
  const Factory = '0x1eFee413332Af162B91206ACA2cf013D0aF4cA49'

  const router = '0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008';
  const factory = '0x7E0987E5b3a30e3f2828572Bb659A548460a3003';
  const factory1 = '0x1eFee413332Af162B91206ACA2cf013D0aF4cA49';
  const swap = '0x559820f99371a74A2157283700B9043dfaF097DC';
  const TEtherToTLink = "0xA7EFaDB82C55cA956c2c7377Ebe2345CCcDB12B2"

  // await hre.run('verify:verify', {
  //   address: '0x07f6EAca4558B8979Ad3adf1cB179825B844f4e4',
  //   constructorArguments: [router, factory]
  // });

  // const SimpleSwap = await ethers.getContractFactory('SwapExample');
  // const simpleSwap = await SimpleSwap.deploy(router, factory);

  const PriceOracle = await ethers.getContractFactory('PriceOracleAggregator'); //0x4ad0e96aEb790454C8D990D9D218cf6DB55d8286
  // try {
  const TEtherToLink = await PriceOracle.deploy(factory, TEther, TAave);
  console.log("Ether to Dai address", await TEtherToLink.getAddress());

  // } catch (error) {
  //   console.log("error", error.message);
  //   if (error.reason) {
  //     console.log("Revert reason", error.reason);
  //   }
  // }

  // await hre.run('verify:verify', {
  //   address: "0xA7EFaDB82C55cA956c2c7377Ebe2345CCcDB12B2",
  //   constructorArguments: [factory, TEther, TLink]
  // })
  // console.log('network', hre.network.name, ethers.Network.name);

  // console.log("simple swap address", await simpleSwap.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
