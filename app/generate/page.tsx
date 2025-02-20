"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function GenerateStory() {
    const [genre, setGenre] = useState("Fantasy");
    const [topic, setTopic] = useState("");
    const [length, setLength] = useState("short");
    const [story, setStory] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateStory = async () => {
        setLoading(true);
        setStory("");
        setAudioUrl("");

        const response = await fetch("/api/generate-story", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genre, topic, length }),
        });

        const data = await response.json();
        setStory(data.story);
        setLoading(false);
    };

    const [audioUrl, setAudioUrl] = useState("");

    useEffect(() => {
        setAudioUrl(""); // Ensures that the audio URL is reset safely
    }, []);

    const handleGenerateAudio = async () => {
        if (!story) return;

        setAudioUrl(""); // Clear previous audio
        const response = await fetch("/api/generate-audio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: story }),
        });

        const data = await response.json();
        setAudioUrl(data.audioUrl);
    };

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-4xl font-bold text-gold text-center mb-8">
                Generate Your Own Story ✨
            </h1>

            <div className="max-w-lg mx-auto bg-dark p-6 rounded-lg shadow-md">
                <label className="block text-gold font-medium mb-2">Select Genre:</label>
                <select
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                >
                    <option>Fantasy</option>
                    <option>Sci-Fi</option>
                    <option>Thriller</option>
                    <option>Romance</option>
                    <option>Horror</option>
                </select>

                <label className="block text-gold font-medium mt-4 mb-2">Story Topic:</label>
                <input
                    type="text"
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    placeholder="Enter a topic (e.g. time travel, lost treasure)..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />

                <label className="block text-gold font-medium mt-4 mb-2">Story Length:</label>
                <select
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                >
                    <option value="short">Short (500 words)</option>
                    <option value="medium">Medium (1000 words)</option>
                    <option value="long">Long (2000 words)</option>
                </select>

                <button
                    className="w-full bg-gold text-dark font-bold py-2 rounded-md mt-4 hover:bg-opacity-80"
                    onClick={handleGenerateStory}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Story"}
                </button>
            </div>

            {story && (
                <div className="mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gold">Your AI-Generated Story</h2>
                    <p className="mt-2 whitespace-pre-wrap">{story}</p>

                    {/* Listen Button */}
                    <button
                        className="mt-4 bg-gold text-dark font-bold py-2 px-4 rounded-md hover:bg-opacity-80"
                        onClick={handleGenerateAudio}
                    >
                        🎧 Listen
                    </button>

                    {/* Audio Player */}
                    {audioUrl && (
                        <audio controls className="mt-4 w-full">
                            <source src={audioUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            )}
        </div>
    );
}

