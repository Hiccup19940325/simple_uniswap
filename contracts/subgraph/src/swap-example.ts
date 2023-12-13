import {
  AddLiquidity as AddLiquidityEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RemoveLiquidity as RemoveLiquidityEvent,
  Swap as SwapEvent,
  UpdatePrice as UpdatePriceEvent
} from "../generated/SwapExample/SwapExample"
import {
  AddLiquidity,
  RemoveLiquidity,
  Swap,
  UpdatePrice,
  Pair
} from "../generated/schema"

export function handleAddLiquidity(event: AddLiquidityEvent): void {
  let liquidity = AddLiquidity.load(event.transaction.hash)
  if (liquidity == null) {
    liquidity = new AddLiquidity(event.transaction.hash)
  }
  liquidity.pair = event.params.pair
  liquidity.amountA = event.params.amountA
  liquidity.amountB = event.params.amountB
  liquidity.tokenA = event.params.tokenA
  liquidity.tokenB = event.params.tokenB
  liquidity.time = event.params.time

  let pair = Pair.load(event.params.pair);

  if (pair == null) {
    pair = new Pair(event.params.pair);
  }
  pair.lastUpdate = event.block.timestamp;

  let addLiquidity = pair.addLiquidity;

  pair.addLiquidity = addLiquidity == null ? [liquidity.id] : addLiquidity.concat([liquidity.id])

  pair.save();

  liquidity.save();
}


export function handleRemoveLiquidity(event: RemoveLiquidityEvent): void {
  let liquidity = RemoveLiquidity.load(event.transaction.hash)
  if (liquidity == null) {
    liquidity = new RemoveLiquidity(event.transaction.hash)
  }
  liquidity.pair = event.params.pair
  liquidity.amountA = event.params.amountA
  liquidity.amountB = event.params.amountB
  liquidity.tokenA = event.params.tokenA
  liquidity.tokenB = event.params.tokenB
  liquidity.time = event.params.time

  let pair = Pair.load(event.params.pair);

  if (pair == null) {
    pair = new Pair(event.params.pair);
  }
  pair.lastUpdate = event.block.timestamp;

  let removeLiquidity = pair.removeLiquidity;

  pair.removeLiquidity = removeLiquidity == null ? [liquidity.id] : removeLiquidity.concat([liquidity.id])

  pair.save();

  liquidity.save();
}

export function handleSwap(event: SwapEvent): void {
  let swap = Swap.load(event.transaction.hash)
  if (swap == null) {
    swap = new Swap(event.transaction.hash)
  }
  swap.pair = event.params.pair
  swap.amountIn = event.params.amountIn
  swap.amountOut = event.params.amountOut
  swap.tokenIn = event.params.tokenIn
  swap.tokenOut = event.params.tokenOut
  swap.time = event.params.time

  let pair = Pair.load(event.params.pair);

  if (pair == null) {
    pair = new Pair(event.params.pair);
  }
  pair.lastUpdate = event.block.timestamp;

  let swapInfo = pair.swap;

  pair.swap = swapInfo == null ? [swap.id] : swapInfo.concat([swap.id])

  pair.save();

  swap.save();
}

export function handleUpdatePrice(event: UpdatePriceEvent): void {
  let price = UpdatePrice.load(event.transaction.hash);
  if (price == null) {
    price = new UpdatePrice(event.transaction.hash)
  }

  price.pair = event.params.pair;
  price.price = event.params.price;
  price.updateTime = event.block.timestamp;

  let pair = Pair.load(event.params.pair);
  if (pair == null) {
    pair = new Pair(event.params.pair);
  }

  pair.lastUpdate = event.block.timestamp;

  let prices = pair.updatePrice;

  pair.updatePrice = prices == null ? [price.id] : prices.concat([price.id]);

  pair.save();

  price.save();
}
