import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, TerminalIcon } from './icons';
import type { GeneratorOptions } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PromptDisplayProps {
  generationResult: { prompt: string; options: GeneratorOptions } | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
    </div>
);

const InitialState: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
        <TerminalIcon className="mx-auto h-12 w-12 text-slate-600" />
        <h3 className="mt-2 text-lg font-medium text-slate-400">Awaiting Generation</h3>
        <p className="mt-1 text-sm">Your AI-generated CCTV prompt will appear here.</p>
    </div>
);

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ generationResult, isLoading, error }) => {
    const [copied, setCopied] = useState(false);
    const { user } = useAuth();
    const prompt = generationResult?.prompt;

    useEffect(() => {
        if (prompt) {
            setCopied(false);
        }
    }, [prompt]);

    const handleCopy = () => {
        if (!prompt) return;
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    return (
        <div className="bg-black/40 border border-slate-700/50 rounded-sm p-6 h-full flex flex-col relative min-h-[400px] lg:min-h-full">
            {prompt && !isLoading && (
                 <div className="absolute top-4 right-4 flex items-center gap-2">
                    {user && (
                      <div className="flex items-center gap-2 text-sm text-green-400/80 animate-fade-in" aria-live="polite">
                        <CheckIcon className="w-5 h-5" />
                        <span>Saved to Dashboard</span>
                      </div>
                    )}
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition"
                        aria-label="Copy prompt"
                    >
                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                 </div>
            )}
            <div className="flex-grow overflow-auto pr-4 custom-scrollbar">
                {isLoading && <LoadingSkeleton />}
                {error && <div className="text-red-400 bg-red-900/30 border border-red-400/30 p-4 rounded-sm font-mono">{error}</div>}
                {!isLoading && !error && !prompt && <InitialState />}
                {!isLoading && !error && prompt && (
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed" style={{textShadow: '0 0 5px rgba(74, 222, 128, 0.2)'}}>
                        {prompt}
                    </p>
                )}
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #475569;
                }
            `}</style>
        </div>
    );
};