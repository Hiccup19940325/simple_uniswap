// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity =0.8.20;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interface/IPriceOracleAggregator.sol";

contract SwapExample is Ownable {
    using SafeERC20 for IERC20;

    IUniswapV2Router02 private router;
    IUniswapV2Factory private factory;

    mapping(address => address) oracleProvider;

    event Swap(
        address pair,
        uint amountIn,
        uint amountOut,
        address tokenIn,
        address tokenOut,
        uint time
    );
    event AddLiquidity(
        address pair,
        uint amountA,
        uint amountB,
        address tokenA,
        address tokenB,
        uint time
    );
    event RemoveLiquidity(
        address pair,
        uint amountA,
        uint amountB,
        address tokenA,
        address tokenB,
        uint time
    );

    event UpdatePrice(address pair, uint price);

    constructor(address _router, address _factory) Ownable(msg.sender) {
        router = IUniswapV2Router02(_router);
        factory = IUniswapV2Factory(_factory);
    }

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path
    ) external returns (uint amountOut) {
        IERC20(path[0]).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(path[0]).approve(address(router), amountIn);

        address pair = factory.getPair(path[0], path[1]);

        uint[] memory amounts = router.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp + 600
        );

        update(pair);

        emit Swap(
            pair,
            amountIn,
            amounts[1],
            path[0],
            path[1],
            block.timestamp
        );

        return amounts[1];
    }

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path
    ) external returns (uint amountIn) {
        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            address(this),
            amountInMax
        );
        IERC20(path[0]).approve(address(router), amountInMax);

        address pair = factory.getPair(path[0], path[1]);

        uint[] memory amounts = router.swapTokensForExactTokens(
            amountOut,
            amountInMax,
            path,
            msg.sender,
            block.timestamp + 600
        );
        amountIn = amounts[0];
        IERC20(path[0]).safeTransfer(msg.sender, amountInMax - amountIn);

        update(pair);

        emit Swap(
            pair,
            amountIn,
            amounts[1],
            path[0],
            path[1],
            block.timestamp
        );
    }

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountA,
        uint _amountB
    ) external returns (uint amountA, uint amountB, uint liquidity) {
        IERC20(_tokenA).safeTransferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).safeTransferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(address(router), _amountA);
        IERC20(_tokenB).approve(address(router), _amountB);

        address pair = factory.getPair(_tokenA, _tokenB);

        (uint _Aamount, uint _Bamount, uint _liquidity) = router.addLiquidity(
            _tokenA,
            _tokenB,
            _amountA,
            _amountB,
            1,
            1,
            msg.sender,
            block.timestamp
        );

        update(pair);

        amountA = _Aamount;
        amountB = _Bamount;
        liquidity = _liquidity;

        emit AddLiquidity(
            pair,
            amountA,
            amountB,
            _tokenA,
            _tokenB,
            block.timestamp
        );
    }

    function removeLiquidity(
        address _tokenA,
        address _tokenB
    ) external returns (uint amountA, uint amountB) {
        address pair = factory.getPair(_tokenA, _tokenB);

        uint liquidity = IERC20(pair).balanceOf(msg.sender);
        IERC20(pair).safeTransferFrom(msg.sender, address(this), liquidity);
        IERC20(pair).approve(address(router), liquidity);

        (uint _amountA, uint _amountB) = router.removeLiquidity(
            _tokenA,
            _tokenB,
            liquidity,
            1,
            1,
            msg.sender,
            block.timestamp
        );
        amountA = _amountA;
        amountB = _amountB;

        update(pair);

        emit RemoveLiquidity(
            pair,
            amountA,
            amountB,
            _tokenA,
            _tokenB,
            block.timestamp
        );
    }

    function getAmountsOut(
        uint amountIn,
        address[] calldata path
    ) public view returns (uint) {
        uint[] memory amounts = UniswapV2Library.getAmountsOut(
            address(factory),
            amountIn,
            path
        );
        return amounts[1];
    }

    function getAmountsIn(
        uint amountOut,
        address[] calldata path
    ) public view returns (uint) {
        uint[] memory amounts = UniswapV2Library.getAmountsIn(
            address(factory),
            amountOut,
            path
        );
        return amounts[0];
    }

    function quote(
        uint amountA,
        address tokenA,
        address tokenB
    ) public view returns (uint amountB) {
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(
            address(factory),
            tokenA,
            tokenB
        );
        amountB = UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function setOracle(address _pair, address _oracle) external onlyOwner {
        oracleProvider[_pair] = _oracle;
    }

    function update(address _pair) internal {
        bool updatable = IPriceOracleAggregator(oracleProvider[_pair])
            .canUpdate();

        if (updatable) {
            uint price = IPriceOracleAggregator(oracleProvider[_pair]).update();

            emit UpdatePrice(_pair, price);
        }
    }
}
