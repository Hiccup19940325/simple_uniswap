import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddLiquidity } from "../generated/schema"
import { AddLiquidity as AddLiquidityEvent } from "../generated/SwapExample/SwapExample"
import { handleAddLiquidity } from "../src/swap-example"
import { createAddLiquidityEvent } from "./swap-example-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let pair = Address.fromString("0x0000000000000000000000000000000000000001")
    let amountA = BigInt.fromI32(234)
    let amountB = BigInt.fromI32(234)
    let tokenA = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenB = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let time = BigInt.fromI32(234)
    let newAddLiquidityEvent = createAddLiquidityEvent(
      pair,
      amountA,
      amountB,
      tokenA,
      tokenB,
      time
    )
    handleAddLiquidity(newAddLiquidityEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddLiquidity created and stored", () => {
    assert.entityCount("AddLiquidity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pair",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountA",
      "234"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountB",
      "234"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenA",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenB",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddLiquidity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "time",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
