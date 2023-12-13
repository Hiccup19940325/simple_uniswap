"use client"
import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Tokens, factory, pair, pairs } from "@/const/yourDetails";
import PlotChart from '../chart';
import { useContract } from "@thirdweb-dev/react";

const GET_PRICE = gql`
    query Price($pair: String!, $from: Int!) {
        pairs (where: {id: $pair}) {
            updatePrice (where: {updateTime_gte: $from}){
                price
                updateTime
            }
        }
    }
`

export default function Info() {
    const [pairAddress, setPair] = useState(pair);
    const { loading, error, data } = useQuery(GET_PRICE, {
        variables: {
            pair: pairAddress,
            from: parseInt(Date.now() / 1000 - 3600 * 24 * 7)
        },
        pollInterval: 1000
    });

    const { contract: Factory } = useContract(factory);

    const getPair = async (pairString: string) => {
        const token0 = pairString.split("/")[0];
        const token1 = pairString.split("/")[1];
        const token0Address = Tokens[token0].address;
        const token1Address = Tokens[token1].address;
        const _pair = await Factory?.call('getPair', [token0Address, token1Address]);
        console.log(token0, token1, token0Address, token1Address, _pair)
        setPair(_pair);
        console.log(pairAddress)
    }

    if (loading) return (
        <div className="flex flex-col gap-4 card w-[1000px] bg-slate-800">
            <div className="flex gap-4 items-center mt-10 ml-10">
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="skeleton h-[500px] w-[900px] m-10"></div>
        </div>
    );
    if (error) return <p className="text-white">{error.message}</p>;
    else {
        ;
        const Data = [...data.pairs[0].updatePrice].sort(function (a, b) {
            return a.updateTime - b.updateTime
        });
        console.log(Data)
        const chartConfig = {
            type: 'line',
            data: {
                labels: Data.map(item => new Date(item.updateTime * 1000).toLocaleString()),
                datasets: [{
                    label: 'Price',
                    borderColor: 'rgb(75, 192, 192)',
                    data: Data.map(item => item.price)
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Price information in 1 day'
                }
            }
        }
        return (
            <div className="card w-[1000px] bg-slate-800 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-white">
                        TEther Price Info
                    </h2>
                    <select className="select select-bordered select-sm w-[150px]" onChange={(e) => getPair(e.target.value)}>
                        {pairs.map(item => <option value={`${item[0]}/${item[1]}`}>{`${item[0]}/${item[1]}`}</option>)}
                    </select>
                    <PlotChart data={chartConfig.data} type={chartConfig.type} />
                </div>
            </div>
        )
    }
}