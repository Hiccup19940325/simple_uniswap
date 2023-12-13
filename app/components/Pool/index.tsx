'use client';
import React, { useEffect, useMemo, useState } from "react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Tokens, swapAddress, factory, pairs, pair } from "@/const/yourDetails";
import { debounce } from "@/utils/debounce";

export function Add() {
    const [loading, setLoading] = useState(false);
    const [amount0, setAmount0] = useState(0);
    const [amount1, setAmount1] = useState(0);
    const [tokenLists, setTokenLists] = useState(["TDai", "TLink"]);
    const [token0, setToken0] = useState(Tokens.TEther);
    const [token1, setToken1] = useState(Tokens.TDai);
    const [pairAddress, setPairAddress] = useState(pair);

    const { contract: tokenA } = useContract(token0.address)
    const { contract: tokenB } = useContract(token1.address)
    const { contract: swap } = useContract(swapAddress)
    const { contract: Factory } = useContract(factory);
    const { contract: Pair } = useContract(pairAddress);

    const handleFloat = (value) => {
        if (parseInt(value * 100000) % 10 != 0) return parseFloat(value).toFixed(4);
        else return value;
    }

    useEffect(() => {
        handleChange0(amount0);
        async function setPair() {
            const _pair = await Factory?.call('getPair', [token0.address, token1.address]);
            setPairAddress(_pair);
        };
        setPair();
    }, [token1, token0]);

    const handleChange0 = async (value) => {
        let amount = (value > 0) ? value : 0;
        setAmount0(handleFloat(amount));
        let amount1 = amount == 0 ? 0 : await swap.call('quote', [BigInt(amount * token0.decimals).toString(), token0.address, token1.address]);
        setAmount1(handleFloat(amount1 / token1.decimals));
    }

    const handleChange1 = async (value) => {
        const check = await checkReserve()
        let amount = (value > 0) ? value : 0;
        setAmount1(handleFloat(amount));
        let amount0 = amount == 0 ? 0 : await swap.call('quote', [BigInt(amount * token1.decimals).toString(), token1.address, token0.address]);
        setAmount0(handleFloat(amount0 / token0.decimals));
    }

    const getTokenLists = (lists, token) => {
        let list = lists.filter(item => item.includes(token));
        let tokenLists = list.flat().filter(item => item != token);
        setToken0(Tokens[token]);
        setTokenLists(tokenLists);
        setToken1(Tokens[tokenLists[0]])
    }

    const handleAdd = async () => {
        try {
            let token0Amount = BigInt(amount0 * token0.decimals);
            let token1Amount = BigInt(amount1 * token1.decimals);
            setLoading(true);
            await tokenA.call('approve', [swapAddress, token0Amount]);
            await tokenB.call('approve', [swapAddress, token1Amount]);

            await swap.call('addLiquidity', [token0.address, token1.address, token0Amount.toString(), token1Amount.toString()]);
            setLoading(false);
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    }
    return (
        <div className="card w-96 bg-slate-800 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-white">
                    Add Liquidity
                </h2>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">{token0.name}</span>
                        <select className="select select-bordered select-sm max-w-xs" onChange={(e) => getTokenLists(pairs, e.target.value)}>
                            {Object.entries(Tokens).map(item => <option value={item[1].name}>{item[1].name}</option>)}
                        </select>
                    </div>
                    <input type="number" step='0.001' placeholder="Type here" value={amount0} className="input input-bordered w-full max-w-xs" onChange={(e) => debounce(handleChange0(e.target.value), 1000)} />
                </label>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">{token1.name}</span>
                        <select className="select select-bordered select-sm max-w-xs" onChange={(e) => setToken1(Tokens[e.target.value])}>
                            {tokenLists.map(item => <option value={item}>{item}</option>)}
                        </select>
                    </div>
                    <input type="number" step='0.001' placeholder="Type here" value={amount1} className="input input-bordered w-full max-w-xs" onChange={(e) => debounce(handleChange1(e.target.value), 1000)} />
                </label>
                {!loading ? <button disabled={!amount0 || !amount1} className="btn w-full" onClick={() => handleAdd()}>add</button> :
                    <button disabled={!amount0 || !amount1} className="btn w-full"><span className="loading loading-spinner loading-lg"></span></button>}
            </div>
        </div>
    )
}

export function Remove() {
    const address = useAddress()
    const [loading, setLoading] = useState(false);
    const [tokenLists, setTokenLists] = useState(["TDai", "TLink"]);


    const [token0, setToken0] = useState(Tokens.TEther);
    const [token1, setToken1] = useState(Tokens.TDai);
    const [piarAddress, setPairAddress] = useState(pair);

    const { contract: swap } = useContract(swapAddress)
    const { contract: Pair } = useContract(pair);
    const { contract: Factory } = useContract(factory);

    const getTokenLists = (lists, token) => {
        let list = lists.filter(item => item.includes(token));
        let tokenLists = list.flat().filter(item => item != token);
        setToken0(Tokens[token]);
        setTokenLists(tokenLists);
        setToken1(Tokens[tokenLists[0]])
    }

    useEffect(() => {
        async function setPair() {
            const _pair = await Factory?.call('getPair', [token0.address, token1.address]);
            setPairAddress(_pair);
        };
        setPair();
    }, [token1, token0]);

    const handleRemove = async () => {
        try {
            setLoading(true);
            let LP = await Pair?.call('balanceOf', [address]);
            await Pair?.call('approve', [swapAddress, LP]);
            await swap?.call('removeLiquidity', [token0.address, token1.address]);
            setLoading(false);
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    }
    return (
        <div className="card w-96 h-[180px] bg-slate-800 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-white">
                    Remove Liquidity
                </h2>
                <div className="grid grid-cols-2 gap-10">
                    <select className="select select-bordered select-sm max-w-xs" onChange={(e) => getTokenLists(pairs, e.target.value)}>
                        {Object.entries(Tokens).map(item => <option value={item[1].name}>{item[1].name}</option>)}
                    </select>
                    <select className="select select-bordered select-sm max-w-xs" onChange={(e) => setToken1(Tokens[e.target.value])}>
                        {tokenLists.map(item => <option value={item}>{item}</option>)}
                    </select>
                </div>
                {!loading ? <button className="btn w-full" onClick={() => handleRemove()}>remove</button> : <button className="btn w-full"><span className="loading loading-spinner loading-lg"></span></button>}
            </div>
        </div>
    )
}