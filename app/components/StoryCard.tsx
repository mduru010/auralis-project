"use client";

import Image from "next/image";
import { saveStory } from "../lib/firebase";
import { auth } from "../lib/firebase";
import { useState } from "react";

interface StoryCardProps {
  title: string;
  genre: string;
  description: string;
  imageUrl: string;
}

const StoryCard = ({ title, genre, description, imageUrl }: StoryCardProps) => {
  const [saved, setSaved] = useState(false);

  const handleSaveStory = async () => {
    if (!auth.currentUser) {
      alert("You need to log in to save stories!");
      return;
    }

    const userId = auth.currentUser.uid;
    await saveStory(userId, { title, genre, description, imageUrl });
    setSaved(true);
  };

  return (
    <div className="bg-dark rounded-lg shadow-lg p-4 w-64">
      {/* Story Cover */}
      <div className="relative w-full h-40 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Story Details */}
      <h2 className="text-gold text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-400">{genre}</p>
      <p className="text-sm text-foreground mt-2 truncate">{description}</p>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button className="bg-gold text-dark px-4 py-2 rounded-md hover:bg-opacity-80">
          Read
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Listen
        </button>
      </div>

      {/* Save Button */}
      <button
        className={`mt-3 w-full px-4 py-2 rounded-md ${saved ? "bg-gray-600 text-white" : "bg-gold text-dark hover:bg-opacity-80"}`}
        onClick={handleSaveStory}
        disabled={saved}
      >
        {saved ? "Saved" : "Save Story"}
      </button>
    </div>
  );
};

export default StoryCard;
