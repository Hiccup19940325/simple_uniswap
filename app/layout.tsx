"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ApolloWrapper } from './ApolloWrapper';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from '@thirdweb-dev/chains'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <ApolloWrapper>
          <ThirdwebProvider
            activeChain={Sepolia}
            clientId='156694403f00e74000d2c3cdf7be354d'
          >
            {children}
          </ThirdwebProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}
