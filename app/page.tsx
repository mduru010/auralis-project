import StoryCard from "./components/StoryCard";

export default function Home() {
  const sampleStories = [
    {
      title: "The Golden Heist",
      genre: "Thriller",
      description: "A master thief plans the perfect gold heist...",
      imageUrl: "/golden-heist.jpg",
    },
    {
      title: "Lost in the Cosmos",
      genre: "Sci-Fi",
      description: "A stranded astronaut discovers an alien mystery...",
      imageUrl: "/cosmos.jpg",
    },
    {
      title: "Whispers of the Past",
      genre: "Mystery",
      description: "A detective unravels a century-old secret...",
      imageUrl: "/whispers.jpg",
    },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-gold text-center mb-8">
        Discover Stories ✨
      </h1>
      
      <div className="flex flex-wrap justify-center gap-6">
        {sampleStories.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}
      </div>
    </div>
  );
}
