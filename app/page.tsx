"use client";
import Image from 'next/image'
import { Add, Remove } from './components/Pool';
import Swap from './components/Swap';
import Info from './components/Info';
import Token from './components/Token';
import React, { useState } from 'react';
import { ConnectWallet } from '@thirdweb-dev/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between absolute w-[100%] bg-[#12141D] bg-cover">
      <div className='absolute left-[1026px] top-[334px] w-[242px] h-[214px] bg-[#4A78EF] blur-[264px]' />
      <div className='absolute left-[168px] top-[513px] w-[410px] h-[362px] bg-[#6828A7] blur-[262px]' />
      <span className='text-white text-5xl mt-10'>
        Let's go with Uniswap
      </span>
      <div className='mt-10'>
        <ConnectWallet />
      </div>
      <Token />
      <div className='grid grid-cols-3 gap-[100px] mt-10'>
        <Swap />
        <Add />
        <Remove />
      </div>
      <div className='mt-10'>
        <Info />
      </div>
    </main>
  )
}
