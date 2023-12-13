'use client';
import React, { useState, useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Tokens, swapAddress, pairs } from "@/const/yourDetails";
import { debounce } from "@/utils/debounce";


export default function Swap() {
    const [amount0, setAmount0] = useState(0);
    const [amount1, setAmount1] = useState(0);
    const [token0, setToken0] = useState(Tokens.TEther);
    const [token1, setToken1] = useState(Tokens.TDai);
    const [tokenLists, setTokenLists] = useState(["TDai", "TLink"]);
    const [loading, setLoading] = useState(false);

    const address = useAddress();
    const { contract: tokenA } = useContract(token0.address)
    const { contract: tokenB } = useContract(token1.address)
    const { contract: swap } = useContract(swapAddress);

    useEffect(() => {
        handleChange0(amount0)
    }, [token1, token0]);

    const handleFloat = (value) => {
        if (parseInt(value * 100000) % 10 != 0) return parseFloat(value).toFixed(4);
        else return value;
    }

    const handleChange0 = async (value) => {
        let amount = value > 0 ? value : 0
        setAmount0(handleFloat(amount));
        let amount1 = amount == 0 ? 0 : await swap.call('getAmountsOut', [BigInt(amount * token0.decimals).toString(), [token0.address, token1.address]]);
        console.log(amount1)

        setAmount1(handleFloat(amount1 / token1.decimals));
    }

    const handleChange1 = async (value) => {
        let amount = value > 0 ? value : 0
        setAmount1(handleFloat(amount));
        console.log(amount * token1.decimals)
        let amount0 = amount == 0 ? 0 : await swap.call('getAmountsIn', [BigInt(amount * token1.decimals).toString(), [token0.address, token1.address]]);
        // console.log(amount1)

        setAmount0(handleFloat(amount0 / token0.decimals));
    }

    const getTokenLists = (lists, token) => {
        let list = lists.filter(item => item.includes(token));
        let tokenLists = list.flat().filter(item => item != token);
        setToken0(Tokens[token])
        setTokenLists(tokenLists);
        setToken1(Tokens[tokenLists[0]])
    }

    const handleSwap = async () => {
        try {
            let token0Amount = BigInt(amount0 * token0.decimals);
            setLoading(true);
            await tokenA.call('approve', [swapAddress, token0Amount]);
            await swap.call('swapExactTokensForTokens',
                [token0Amount.toString(),
                    '1',
                [token0.address, token1.address]])
            setLoading(false)
        } catch (err) {
            alert(err.message)
            setLoading(false)
        }
    }
    return (
        <div className="card w-96 bg-slate-800 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-white">
                    Swap
                </h2>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">{token0.name}</span>
                        <select className="select select-bordered select-sm max-w-xs" onChange={(e) => getTokenLists(pairs, e.target.value)}>
                            {Object.entries(Tokens).map(item => <option value={item[1].name}>{item[1].name}</option>)}
                        </select>
                    </div>
                    <input type="number" step='0.001' placeholder="Type here" value={amount0} onChange={(e) => debounce(handleChange0(e.target.value), 1000)} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">{token1.name}</span>
                        <select className="select select-bordered select-sm max-w-xs" onChange={(e) => setToken1(Tokens[e.target.value])}>
                            {tokenLists.map(item => <option value={item}>{item}</option>)}
                        </select>
                    </div>
                    <input type="number" step='0.001' placeholder="Type here" value={amount1} onChange={(e) => debounce(handleChange1(e.target.value), 1000)} className="input input-bordered w-full max-w-xs" />
                </label>
                {!loading ? <button disabled={!amount0 && !amount1} className="btn w-full" onClick={() => handleSwap()}>swap</button> :
                    <button disabled={!amount0 || !amount1} className="btn w-full"><span className="loading loading-spinner loading-lg"></span></button>}
            </div>
        </div>
    )
}