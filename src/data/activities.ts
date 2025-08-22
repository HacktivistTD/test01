// src/data/activities.ts

export interface Activity {
  id: number;
  title: string;
  image: string;
  alt: string;
  location: string;
  rating: number;
  price: string;
  category: string;
  duration: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "Sigiriya Rock Fortress",
    image: "/sigiriya-sri-lanka.png",
    alt: "Ancient rock fortress with frescoes",
    location: "Matale District",
    rating: 4.8,
    price: "$30",
    category: "Cultural Heritage",
    duration: "4-5 hours",
    description:
      "Climb the ancient rock fortress with stunning frescoes and panoramic views.",
  },
  {
    id: 2,
    title: "Yala National Park Safari",
    image: "/yala-national-park-sri-lanka-landscape-view.jpg",
    alt: "Wildlife safari in Yala",
    location: "Southern Province",
    rating: 4.7,
    price: "$45",
    category: "Wildlife Safari",
    duration: "6-8 hours",
    description:
      "World's highest leopard density park with elephants, sloth bears & diverse wildlife.",
  },
  {
    id: 3,
    title: "Temple of Sacred Tooth",
    image: "/Sri-Dalada-Maligawa-Temple-of-the-Tooth-Relic.jpg",
    alt: "Sacred Buddhist temple",
    location: "Kandy",
    rating: 4.6,
    price: "$15",
    category: "Religious Sites",
    duration: "2-3 hours",
    description:
      "Sacred Buddhist temple housing the tooth relic of Lord Buddha.",
  },
  {
    id: 4,
    title: "Ella Nine Arch Bridge",
    image: "/nine-arch-bridge-in-ella.webp",
    alt: "Colonial railway bridge",
    location: "Ella, Hill Country",
    rating: 4.5,
    price: "Free",
    category: "Scenic Views",
    duration: "2-3 hours",
    description:
      "Iconic colonial-era railway bridge surrounded by lush tea plantations.",
  },
  {
    id: 5,
    title: "Galle Fort Walking Tour",
    image: "/Galle-Fort.webp",
    alt: "Dutch colonial fort",
    location: "Galle",
    rating: 4.4,
    price: "$20",
    category: "Historical Sites",
    duration: "3-4 hours",
    description:
      "UNESCO World Heritage Dutch colonial fort with cobblestone streets and history.",
  },
  {
    id: 6,
    title: "Little Adam's Peak",
    image: "/Little-Adams-Peak.jpg",
    alt: "Ella Little Adam's Peak",
    location: "Ella",
    rating: 4.8,
    price: "$25",
    category: "Hiking",
    duration: "8-10 hours",
    description:
      "Sacred pilgrimage site with breathtaking sunrise views from the summit.",
  },
  {
    id: 7,
    title: "Mirissa Whale Watching",
    image: "/whale-watching-mirissa.jpg",
    alt: "Blue whales and dolphins",
    location: "Southern Coast",
    rating: 4.6,
    price: "$35",
    category: "Marine Life",
    duration: "4-6 hours",
    description:
      "Spot blue whales, sperm whales, and playful dolphins in the Indian Ocean.",
  },
  {
    id: 8,
    title: "Nuwara Eliya Tea Plantation",
    image: "/Tea-plantation-visit-in-Nuwara-Eliya.jpg",
    alt: "Ceylon tea gardens",
    location: "Hill Country",
    rating: 4.5,
    price: "$18",
    category: "Agriculture",
    duration: "3-4 hours",
    description:
      "Tour world-famous Ceylon tea estates and learn about tea production.",
  },
  {
    id: 9,
    title: "Dambulla Golden Temple",
    image: "/golden-temple-dambulla.jpg",
    alt: "Ancient cave paintings",
    location: "Central Province",
    rating: 4.4,
    price: "$12",
    category: "Religious Sites",
    duration: "2-3 hours",
    description:
      "Ancient cave temple complex with stunning Buddhist murals and statues.",
  },
  {
    id: 10,
    title: "Minneriya Elephant Gathering",
    image: "/minneriya-game-drives-2.jpg",
    alt: "Wild elephant herds",
    location: "North Central Province",
    rating: 4.7,
    price: "$40",
    category: "Wildlife Safari",
    duration: "4-5 hours",
    description:
      "Witness hundreds of wild elephants gathering at the ancient reservoir.",
  },
  {
    id: 11,
    title: "Surfing in Weligama",
    image: "/Surfing-weligama.png",
    alt: "Surfing waves in Weligama",
    location: "Southern Province",
    rating: 4.7,
    price: "$40",
    category: "Surfing",
    duration: "2-4 hours",
    description:
      "Ride the waves in one of Sri Lanka &apos;s most popular surfing spots, perfect for beginners and pros.",
  },
  {
    id: 12,
    title: "Scuba Diving in Trincomalee",
    image: "/Pigeon-Island.jpeg",
    alt: "Scuba diving near Pigeon Island",
    location: "Trincomalee",
    rating: 4.7,
    price: "$50",
    category: "Marine Adventure",
    duration: "3-5 hours",
    description:
      "Discover vibrant coral reefs and diverse marine life around Pigeon Island.",
  },
  {
    id: 13,
    title: "Kayaking in Samanalawewa",
    image: "/Kayaking-Tour-In-Sri-Lanka.jpg",
    alt: "Kayaking in Samanalawewa",
    location: "Sabaragamuwa Province",
    rating: 4.6,
    price: "$25",
    category: "Kayaking",
    duration: "2-3 hours",
    description:
      "Paddle through calm waters surrounded by lush greenery and mountains.",
  },
  {
    id: 15,
    title: "Udawalawa Safari",
    image: "/udawalawa-national-park.jpg",
    alt: "Udawalawa National Park",
    location: "Udawalawa",
    rating: 4.7,
    price: "$45",
    category: "Wildlife Safari",
    duration: "3-4 hours",
    description:
      "An adrenaline-filled experience rappelling down waterfalls in the rainforest.",
  },
    {
    id: 16,
    title: "Boat tour in Madu River",
    image: "/madu-river-boat-ride.jpeg",
    alt: "Boat tour in Madu River",
    location: "Madu River",
    rating: 4.7,
    price: "$45",
    category: "Adventure",
    duration: "3-4 hours",
    description:
      "Explore the mangrove forests and islands of Madu River on a scenic boat tour.",
  },
   {
    id: 17,
    title: "Hike to Adams Peak",
    image: "/adams-peak.png",
    alt: "Hike to Adams Peak",
    location: "Adams Peak",
    rating: 4.7,
    price: "$45",
    category: "treking",
    duration: "3-4 hours",
    description:
      "Explore the mangrove forests and islands of Madu River on a scenic boat tour.",
  },

];

export default activities;
