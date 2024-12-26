'use client'

import React, {useContext, useEffect, useState} from 'react';
import {AgentContext} from "@/contexts/AgentProvider";
import {fetchToken} from "@/api/fetchToken";
import { FaSpinner } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

const HomePage: React.FC = () => {
    const {featuredTokens} = useContext(AgentContext);

    const [userMessage, setUserMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [displayedMessage, setDisplayedMessage] = useState('');

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

    const handleSubmit = async () => {
        try {
            if (isLoading) return;
            setResponseMessage(null)

            setIsLoading(true)
            const resp = await fetchToken({
                message: userMessage,
            });
            setResponseMessage(resp?.message)
            console.log('Response:', resp);
        } catch (error) {
            console.error('Error submitting message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Top Navigation Bar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-gray-800">
                <div className="text-xl font-bold">Logo</div>
                <div className="flex space-x-6">
                    <a href="#" className="hover:text-purple-400">Home</a>
                    <a href="#" className="hover:text-purple-400">Features</a>
                    <a href="#" className="hover:text-purple-400">Pricing</a>
                    <a href="#" className="hover:text-purple-400">Contact Us</a>
                </div>
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
            </nav>

            {/* Main Hero Section */}
            <main>
                <div className="relative flex flex-col items-center justify-center px-4 py-16">
                    {/* Vibrant Soundwave Animation */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div
                            className="w-full h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl blur-lg opacity-30"></div>
                        {/*<div className="absolute inset-0 flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url(/images/vibrant-sound-wave.jpeg)]"/>*/}
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="w-full h-40 flex justify-center items-center mt-10">
                            <div className="relative z-10 text-center">
                                {/* Placeholder for Animation */}
                                <div className="w-80 h-80 flex justify-center items-center">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse blur-lg w-full h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Carousel for Featured Tokens */}
                    <div className="mt-2 max-w-full overflow-x-auto w-full z-10">
                        <div className="flex overflow-scroll space-x-6 [&>div]:flex-shrink-0">
                            {featuredTokens.map((token, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 p-4 bg-gradient-to-b from-grey-800 via-transparent to-transparent rounded-lg border border-purple-500 shadow-lg text-center w-60 backdrop-blur-sm"
                                >
                                    <h3 className="text-lg font-bold text-white">{token.name}</h3>
                                    <p className="mt-2 text-purple-300">{token.price ? `$${token.price}` : 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Question Input Section */}
                    <div className="mt-16 w-full flex flex-col items-center z-10">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4">Ask Palm</h2>
                        <div className="w-full max-w-2xl">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                placeholder="Type your question here..."
                                className="w-full p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSubmit}
                                className="mt-4 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? <FaSpinner className="animate-spin" /> : 'Send'}
                            </button>
                        </div>

                        {/*/!* AI Assistant Response Section *!/*/}
                        {/*{responseMessage && (*/}
                        {/*    <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg max-w-2xl">*/}
                        {/*        <h3 className="text-lg font-bold text-purple-300">Assistants Response:</h3>*/}
                        {/*        <p className="mt-2">{responseMessage}</p>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        {/* AI Assistant Response Section */}
                        {responseMessage && (
                            <div className="mt-8 p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg shadow-lg max-w-2xl overflow-auto break-words">
                                <h3 className="text-lg font-bold text-purple-300">Palm:</h3>
                                <ReactMarkdown className="mt-2 whitespace-pre-wrap break-words">{displayedMessage}</ReactMarkdown>
                            </div>
                        )}

                    </div>

                </div>
            </main>

            {/* Footer Section */}
            <footer className="mt-16 py-6 bg-gray-800 text-center">
                <p className="text-gray-400">&copy; 2024 Palms AI. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
