'use client';
import React, { useState } from "react";
import { Web3Button, useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Tokens } from "@/const/yourDetails";

export default function Token() {

    const address = useAddress();
    const [amountToMint, setAmountToMint] = useState(0);
    const [loading, setLoading] = useState(false);
    const { contract: TEtherContract } = useContract(Tokens.TEther.address);

    // const handleMint = async () => {
    //     await TEtherContract.call("mint", [address, amountToMint * 0.01 * TEther.decimals])
    // }
    return (
        <div className="card w-96 bg-slate-800 shadow-xl mt-10">
            <div className="card-body">
                <h2 className="card-title text-white">
                    Token
                </h2>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text text-white">TEther</span>

                    </div>
                    <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={(e: any) => {
                        setAmountToMint(e.target.value)
                    }} />
                </label>
                {!loading ? <button className="btn w-full" onClick={async () => {
                    if (amountToMint > 10 || amountToMint <= 0) alert("Invalid amount")
                    else {
                        try {
                            setLoading(true)
                            await TEtherContract?.call("mint", [address, (amountToMint * 0.01 * Tokens.TEther.decimals).toString()])
                            setLoading(false)
                        } catch (err: any) {
                            alert(err.message)
                            setLoading(false)
                        }
                    }

                }}>Mint</button> :
                    <button className="btn w-full"><span className="loading loading-spinner loading-lg"></span></button>}
            </div>
        </div>
    )
}