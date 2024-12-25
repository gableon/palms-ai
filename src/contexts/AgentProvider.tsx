'use client'

import React, {createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect} from 'react';
import { Message, FeaturedToken } from "@/types";

//*
// Defines Agent global states and actions
//*
interface AgentContextProps {
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    featuredTokens: FeaturedToken[];
    setFeaturedTokens: Dispatch<SetStateAction<FeaturedToken[]>>;
}

export const AgentContext = createContext<AgentContextProps>({
    messages: [],
    setMessages: () => { },
    featuredTokens: [],
    setFeaturedTokens: () => { },
});

interface AgentProviderProps {
    children: ReactNode;
}

const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [featuredTokens, setFeaturedTokens] = useState<FeaturedToken[]>([])


    useEffect(() => {
        console.log("reload!")
        // todo: load featured tokens properly!
        setFeaturedTokens(seedFeaturedTokens)
    }, [])

    return (
        <AgentContext.Provider value={{
            messages,
            setMessages,
            featuredTokens,
            setFeaturedTokens
        }}>
            {children}
        </AgentContext.Provider>
    );
};

export default AgentProvider;

// TEST DATA
const seedFeaturedTokens: FeaturedToken[] = [
    {
        name: "Bonk",
        slug: "bonk",
        contractAddress: "Fhtz2W5B9HsiW3gddpWbfyH2eER4Hf3dJd5PdyV9S7sx",
        image: "https://example.com/bonk.png",
        price: 0.0000035,
        marketCap: 5000000,
    },
    {
        name: "Samoyedcoin",
        slug: "samoyedcoin",
        contractAddress: "4k3Dyjzvzp8eMzg1Vt9yFq9xD9hyxTNgL9fpX2NNZpWo",
        image: "https://example.com/samoyedcoin.png",
        price: undefined,
        marketCap: undefined,
    },
    {
        name: "Frog Inu",
        slug: "frog-inu",
        contractAddress: "2MxK3MqzpdszViRVY1wcfW1HnFzkg8z9YRwVxip1ErHE",
        image: "https://example.com/froginu.png",
        price: 0.00045,
        marketCap: 3000000,
    },
    {
        name: "Doge Capital",
        slug: "doge-capital",
        contractAddress: "A2GuE4hWdBfj6fybgnX5VnCcZB7F62X1gT5zBbqrhW3Z",
        image: "https://example.com/dogecapital.png",
        price: 1.2,
        marketCap: 2500000,
    },
    {
        name: "Solana Inu",
        slug: "solana-inu",
        contractAddress: "9HwsPLRRSmD4V4jBV5zFQe4b2HzFgL7pExR6gGfjZBvM",
        image: "https://example.com/solanainu.png",
        price: 0.00015,
        marketCap: 4500000,
    },
    {
        name: "PepeSol",
        slug: "pepesol",
        contractAddress: "Bt8kX6SowTxG2Mn3Fhzk2He5Jm8gKXvNh5eDpF9hPqMn",
        image: "https://example.com/pepesol.png",
        price: 0.0009,
        marketCap: 3500000,
    },
    {
        name: "AISol",
        slug: "AISOL",
        contractAddress: "Bt8hdBJDH2Mn3Fhzk2He5Jm8gKXvNh5eDpF9hPqMn",
        image: "https://example.com/AISol.png",
        price: 0.00099999,
        marketCap: undefined,
    },{
        name: "PepeSol2",
        slug: "pepesol2",
        contractAddress: "2t82X6SowTxG2Mn3Fhzk2He5Jm8gKXvNh5eDpF9hPqMn",
        image: "https://example.com/pepesol2.png",
        price: 0.0000000002,
        marketCap: undefined,
    },
];
