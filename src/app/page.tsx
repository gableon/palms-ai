'use client'

import React, { useContext, useEffect, useRef, useState } from 'react';
import { AgentContext } from "@/contexts/AgentProvider";
import { fetchToken } from "@/api/fetchToken";
import { FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { FeaturedToken } from "@/types";
import { getTokenName } from "@/api/tokenName";
import {delay, getBase64Audio} from "@/utils";

const HomePage: React.FC = () => {
    const { featuredTokens } = useContext(AgentContext);
    const responseRef = useRef<HTMLDivElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [audioPlayed, setAudioPlayed] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [tokenName, setTokenName] = useState("Palms");
    const [tokenImage, setTokenImage] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");
    const [copySuccess, setCopySuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [displayedMessage, setDisplayedMessage] = useState('');
    const [loadingText, setLoadingText] = useState('fetching LLM data & processing model...');

    useEffect(() => {
        if (responseMessage && responseRef.current) {
            responseRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [responseMessage]);

    const _stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    const _playAudio = (audioName: string, b64?: string) => {
        // stop audio
        _stopAudio()
        // build audio
        const audio = b64 ? getBase64Audio(b64) : new Audio(`./${audioName}.mp3`)

        // play audio
        audioRef.current = audio
        audio?.play()
            .then(() => setAudioPlayed(true))
            .catch((error) => {
                console.error(`Error playing audio ${audioName}:`, error);
            });
    }

    useEffect(() => {
        if (!audioPlayed) {
            const handleInteraction = () => {
                _playAudio('welcome')
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
            };

            document.addEventListener('click', handleInteraction);
            document.addEventListener('keydown', handleInteraction);

            return () => {
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
            };
        }
    }, [audioPlayed]);

    // simulates like the chat is writting itself
    useEffect(() => {
        if (!responseMessage) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            setDisplayedMessage(responseMessage.slice(0, currentIndex + 1));
            currentIndex++;

            if (currentIndex === responseMessage.length) {
                clearInterval(interval);
            }
        }, 10); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [responseMessage]);

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>; // Correctly type the timeout ID

        if (isLoading) {
            const texts = [
                'looking for your pants size',
                'mouth to mouth huh?',
                'fetching LLM data & processing model...',
                'connecting to the blockchain...',
                'analyzing token trends...',
                'optimizing trade strategies...',
                'parsing data into human readable string...',
                'making sure we have a safe connection...',
                'did I told you I love cats?',
                'what come first, the chicken or the egg?',
                'do you like pina coladas?',
                'and get caught in the rain?',
                'careless whisper¡?'
            ];

            let currentIndex = 0;

            const updateText = () => {
                currentIndex = (currentIndex + 1) % texts.length; // Cycle through texts
                setLoadingText(texts[currentIndex]);

                // Calculate a random delay between 3 and 5 seconds
                const randomDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

                // Set the next timeout
                timeoutId = setTimeout(updateText, randomDelay);
            };

            // Start the first update
            updateText();

            return () => clearTimeout(timeoutId); // Cleanup on unmount or when loading stops
        }
    }, [isLoading]);

    // const handleSubmit = async (token?: FeaturedToken | undefined) => {
    const handleSubmit = async () => {
        try {
            if (isLoading) return;
            setIsLoading(true)
            _stopAudio()
            await delay(1500)
            _playAudio('teasing')
            return;
        } catch (error) {
            console.error('Error submitting message:', error);
            setResponseMessage("request failed - please provide a valid contract address")
        } finally {
            setIsLoading(false);
        }
    };

    const handleCardClick = async (token: FeaturedToken) => {
        console.log("token", token)
        await handleSubmit()
    };

    const copyToClipboard = () : void => {
        console.log("token address", tokenAddress)
        if (!tokenAddress) {
            // todo: show a snackbar error
            console.error('Could not copy to clipboard')
        }
        navigator.clipboard.writeText(tokenAddress).then(() =>{
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000)
        }).catch(err => {
            console.error("Could not copy to clipboard", err);
            setCopySuccess(false);
        })
        return;
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-cyan-900 to-gray-900 text-cyan-50">
            {/* Top Navigation Bar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
                <div className="flex items-center">
                    <img src="/images/PalmsLogoWhite.png" alt="Logo" className="h-10 object-contain" />
                </div>
                <div className="flex space-x-6">
                    <a href="https://aipalms.com" className="hover:text-cyan-300">Home</a>
                    <a href="https://aipalms.com/#roadmap" className="hover:text-cyan-300">Roadmap</a>
                    <a href="https://github.com/gableon/palms-open-api" className="hover:text-cyan-300">Github</a>
                    <div className="relative group">
                        <a
                            href="#"
                            className="text-gray-500 cursor-not-allowed"
                            aria-disabled="true"
                        >
                            DeFi
                        </a>
                        <span
                            className="absolute top-full mt-2 hidden text-xs text-white bg-gray-800 px-2 py-1 rounded group-hover:block">
                            Coming soon
                        </span>
                    </div>
                </div>
                <div className="w-8 h-8 bg-cyan-600 rounded-full"></div>
            </nav>

            {/* Main Hero Section */}
            <main>
                <div className="relative flex flex-col items-center justify-center px-4 py-16">
                    {/* Vibrant Soundwave Animation */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div
                            className="w-full h-64 bg-gradient-to-r from-cyan-500 to-green-200 rounded-xl blur-lg opacity-40"></div>
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="w-full h-40 flex justify-center items-center mt-10">
                            <div className="relative z-10 text-center">
                                {/* Placeholder for Animation */}
                                <div className="w-80 h-80 flex justify-center items-center">
                                    <div
                                        className="bg-gradient-to-r from-cyan-500 to-green-200 rounded-full animate-pulse blur-lg w-full h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Carousel for Featured Tokens */}
                    <div className="relative mt-0 max-w-full overflow-x-auto whitespace-nowrap overscroll-contain scroll-touch">
                        <div className="flex space-x-6">
                            {featuredTokens.map((token, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCardClick(token)}
                                    className="flex-shrink-0 p-4 bg-gradient-to-b from-gray-900 to-cyan-900 rounded-lg border border-cyan-400 shadow-lg w-60 backdrop-blur-md text-left"
                                >
                                    <div className="flex justify-center mb-2">
                                        <img
                                            src={token.image || '/placeholder.png'}
                                            alt={token.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-cyan-300 mb-1">{token.name} <span
                                        className="text-cyan-400">({token.symbol})</span></h3>
                                    <p className="text-sm text-cyan-400 mb-1">💰
                                        Price: {token.price ? `$${token.price.toFixed(2)}` : 'N/A'}</p>
                                    <p className="text-sm text-cyan-400 mb-1">📊
                                        Volume: {token.volume ? `$${token.volume.toLocaleString()}` : 'N/A'}</p>
                                    <p className="text-sm text-cyan-400 mb-1">
                                        📈 24h % Change: {token.change24h ? `${token.change24h.toFixed(2)}%` : 'N/A'}</p>
                                    <p className="text-sm text-cyan-400 mb-1">
                                        🏔️ ATH %
                                        Change: {token.athChange ? `${token.athChange.toFixed(2)}%` : 'N/A'}</p>
                                    <p className="text-sm text-cyan-400">💼 Market
                                        Cap: {token.marketCap ? `$${token.marketCap.toLocaleString()}` : 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Question Input Section */}
                    <div className="mt-16 w-full flex flex-col items-center z-10">
                        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Ask Palm</h2>
                        <h6 className="text-xs font-bold text-cyan-300 mb-4">disqualified from SOL hackathon for being too sexy</h6>
                        <div className="w-full max-w-2xl">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder="Contract Address..."
                                className="w-full p-4 bg-gradient-to-r from-gray-800 to-cyan-900 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                disabled={isLoading}
                            />
                            <button
                                onClick={() => handleSubmit()}
                                className="mt-4 w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="ml-4 flex items-center space-x-2">
                                        <FaSpinner className="animate-spin" />
                                        <b><i>{loadingText}</i></b>
                                    </div>
                                ) : (
                                    'Send'
                                )}
                            </button>
                        </div>

                        {/* AI Assistant Response Section */}
                        {responseMessage && (
                            <div ref={responseRef}
                                 className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg max-w-2xl overflow-auto break-words">
                                {tokenImage && (
                                    <img
                                        src={tokenImage}
                                        alt={`${tokenName} logo`}
                                        className="w-10 h-10 rounded-full border-2 border-cyan-300"
                                    />
                                )}
                                <h3 className="text-lg font-bold">{tokenName}</h3>
                                <div className="mt-4 flex space-x-4 items-center">
                                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-md">Buy Token</button>
                                    <button
                                        onClick={copyToClipboard}
                                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md shadow-md"
                                    >
                                        Copy Address
                                    </button>
                                    {copySuccess && (
                                        <span className="text-green-500 font-bold"> Copied to Clipboard! </span>
                                    )}
                                </div>
                                <ReactMarkdown
                                    className="mt-2 whitespace-pre-wrap break-words">{displayedMessage}</ReactMarkdown>
                            </div>
                        )}

                    </div>

                </div>
            </main>

            {/* Footer Section */}
            <footer className="mt-16 py-6 bg-gray-800 text-center">
                <p className="text-cyan-400">&copy; 2024 Palms AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
