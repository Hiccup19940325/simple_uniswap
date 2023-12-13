import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddLiquidity,
  OwnershipTransferred,
  RemoveLiquidity,
  Swap,
  UpdatePrice
} from "../generated/SwapExample/SwapExample"

export function createAddLiquidityEvent(
  pair: Address,
  amountA: BigInt,
  amountB: BigInt,
  tokenA: Address,
  tokenB: Address,
  time: BigInt
): AddLiquidity {
  let addLiquidityEvent = changetype<AddLiquidity>(newMockEvent())

  addLiquidityEvent.parameters = new Array()

  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "amountA",
      ethereum.Value.fromUnsignedBigInt(amountA)
    )
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "amountB",
      ethereum.Value.fromUnsignedBigInt(amountB)
    )
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenB", ethereum.Value.fromAddress(tokenB))
  )
  addLiquidityEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return addLiquidityEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createRemoveLiquidityEvent(
  pair: Address,
  amountA: BigInt,
  amountB: BigInt,
  tokenA: Address,
  tokenB: Address,
  time: BigInt
): RemoveLiquidity {
  let removeLiquidityEvent = changetype<RemoveLiquidity>(newMockEvent())

  removeLiquidityEvent.parameters = new Array()

  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "amountA",
      ethereum.Value.fromUnsignedBigInt(amountA)
    )
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam(
      "amountB",
      ethereum.Value.fromUnsignedBigInt(amountB)
    )
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenA", ethereum.Value.fromAddress(tokenA))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("tokenB", ethereum.Value.fromAddress(tokenB))
  )
  removeLiquidityEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return removeLiquidityEvent
}

export function createSwapEvent(
  pair: Address,
  amountIn: BigInt,
  amountOut: BigInt,
  tokenIn: Address,
  tokenOut: Address,
  time: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("tokenIn", ethereum.Value.fromAddress(tokenIn))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("tokenOut", ethereum.Value.fromAddress(tokenOut))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )

  return swapEvent
}

export function createUpdatePriceEvent(
  pair: Address,
  price: BigInt
): UpdatePrice {
  let updatePriceEvent = changetype<UpdatePrice>(newMockEvent())

  updatePriceEvent.parameters = new Array()

  updatePriceEvent.parameters.push(
    new ethereum.EventParam("pair", ethereum.Value.fromAddress(pair))
  )
  updatePriceEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return updatePriceEvent
}
