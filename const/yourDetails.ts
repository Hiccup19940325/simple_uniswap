import { Token } from "./types";

export const Tokens: Token = {
    "TEther": {
        name: 'TEther',
        address: '0x0Cc68AD25AA0172D591F4421666578464ACeA011',
        decimals: 1e18,
    },
    "TDai": {
        name: 'TDai',
        address: '0x315209D528093781ceF9116eF8DE212DA56cf988',
        decimals: 1e18,
    },
    "TLink": {
        name: 'TLink',
        address: '0x85Fc75a248E68d3E32434e00350cBB363adaeb36',
        decimals: 1e18,
    },

};

export const pairs: string[][] = [
    ['TEther', 'TDai'], ['TEther', 'TLink']
];

export const factory = '0x7E0987E5b3a30e3f2828572Bb659A548460a3003';
export const pair = '0x6D2Fc0210e90D6CA9F051478110FBb0FCFA7cc42';
export const swapAddress = '0x07f6EAca4558B8979Ad3adf1cB179825B844f4e4';