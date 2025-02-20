/* eslint no-use-before-define: 0 */  // --> OFF
"use client";

import { useEffect, useState } from "react";
import { getSavedStories, removeSavedStory } from "../lib/firebase";
import { auth } from "../lib/firebase";
import StoryCard from "../components/StoryCard";

export default function Library() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const savedStories = await getSavedStories(userId);
        setStories(savedStories);
        setLoading(false);
      }
    };

    fetchStories();
  }, [auth.currentUser]);

  if (loading) return <p className="text-center text-gold">Loading saved stories...</p>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gold text-center mb-8">Your Library 📚</h1>

      {stories.length === 0 ? (
        <p className="text-center text-gray-400">No saved stories yet.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {stories.map((story) => (
            <div key={story.id} className="relative">
              <StoryCard {...story} />
              <button
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs hover:bg-red-500"
                onClick={async () => {
                  await removeSavedStory(story.id);
                  setStories(stories.filter((s) => s.id !== story.id));
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
