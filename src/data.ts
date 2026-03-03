export interface RoomOption {
  type: string;
  capacity: string;
  description: string;
  pricePerNight: number;
}

export interface Resort {
  id: string;
  name: string;
  description: string;
  priceRange: 'Budget' | 'Mid-Range' | 'Luxury';
  priceRangeValue: string;
  isAllInclusive: boolean;
  travelTimeMinutes: number;
  walkability: 'Low' | 'Medium' | 'High';
  resortSize: 'Boutique' | 'Medium' | 'Large' | 'Massive';
  kidsClubCost: string;
  kidsClubHours: string;
  kidsClubAges: string;
  amenities: string[];
  dining: {
    restaurants: string[];
    vegetarianFriendly: string;
  };
  kidsClub: string;
  activities: string[];
  roomOptions: RoomOption[];
  bookingLink: string;
  highlights: string[];
  specialOffers?: string;
  image: string;
  lat: number;
  lng: number;
  locationNote: string;
}

export interface Landmark {
  name: string;
  type: 'Airport' | 'City' | 'Attraction' | 'Transport';
  lat: number;
  lng: number;
  description: string;
}

export const LANDMARKS: Landmark[] = [
  { name: 'Cancun Intl Airport (CUN)', type: 'Airport', lat: 21.0402, lng: -86.8732, description: 'Primary arrival point. ~15-30 mins to most resorts.' },
  { name: 'Downtown Cancun (Centro)', type: 'City', lat: 21.1619, lng: -86.8515, description: 'Local culture, markets (Mercado 28), and authentic dining.' },
  { name: 'Isla Mujeres Ferry', type: 'Transport', lat: 21.1822, lng: -86.8041, description: 'Puerto Juarez ferry terminal for day trips to Isla Mujeres.' },
  { name: 'Playa Delfines', type: 'Attraction', lat: 21.0605, lng: -86.7796, description: 'Famous public beach with the "CANCUN" sign.' },
  { name: 'La Isla Shopping Village', type: 'Attraction', lat: 21.1111, lng: -86.7628, description: 'Open-air mall with aquarium and dining in the Hotel Zone.' }
];

export const RESORTS: Resort[] = [
  {
    id: 'garza-blanca',
    name: 'Garza Blanca Resort & Spa Cancun',
    description: 'A contemporary luxury resort known for its sophisticated design and exceptional service. Highly recommended by vegetarian travelers for its diverse and high-quality plant-based options. Features a Gourmet Culinary All-Inclusive plan.',
    priceRange: 'Luxury',
    priceRangeValue: '$345 - $429',
    isAllInclusive: true,
    travelTimeMinutes: 40,
    walkability: 'Low',
    resortSize: 'Medium',
    kidsClubCost: 'Included',
    kidsClubHours: '9 AM - 10 PM',
    kidsClubAges: '4 - 12 years',
    amenities: ['Infinity Pools', 'World-class Spa', 'Beachfront Service', 'Fitness Center', 'Yoga Deck', 'Wibit Aqua Park Access'],
    dining: {
      restaurants: ['Blanca Blue (Mexican)', 'BocaDos STK (Steakhouse)', 'Hiroshi (Japanese)', 'DAO (Chinese)', 'The Snack'],
      vegetarianFriendly: 'Excellent. Dedicated vegetarian, vegan, and gluten-free menus across all gourmet outlets.'
    },
    kidsClub: 'Interactive Kids Club with supervised crafts, games, beach sports, and cooking classes. Babysitting available for children under 4 (~$35/hr).',
    activities: ['Snorkeling', 'Paddleboarding', 'Yoga', 'Aqua Fitness', 'Evening Shows'],
    roomOptions: [
      { type: 'Junior Suite', capacity: '4 Guests', description: 'Modern suite with ocean, garden, or swim-up options.', pricePerNight: 345 },
      { type: 'One Bedroom Suite', capacity: '4 Guests', description: 'Includes a separate bedroom, living area, and kitchenette.', pricePerNight: 550 },
      { type: 'Two Bedroom Residence', capacity: '6 Guests', description: 'Perfect for families, featuring a full kitchen and large terrace.', pricePerNight: 850 },
      { type: 'Three Bedroom Loft', capacity: '8 Guests', description: 'Ultimate family stay with multiple levels and expansive views.', pricePerNight: 1200 }
    ],
    bookingLink: 'https://bookings.cancun.garzablancaresort.com/booking1?language=ENGLISH&numRooms=1&startDate=17/06/2026&endDate=21/06/2026&adultsRoom1=2&childrenRoom1=2&babiesRoom1=1&agesKid1=8&agesKid2=5&namespace=tafer-garza-blanca',
    highlights: ['Top-tier vegetarian dining', 'Spacious multi-bedroom lofts', 'Shared privileges with Villa del Palmar'],
    specialOffers: 'Shared privileges with Villa del Palmar; Gourmet All-Inclusive.',
    image: 'https://picsum.photos/seed/garza/800/600',
    lat: 21.2225,
    lng: -86.8058,
    locationNote: 'Located in Playa Mujeres, a more secluded and exclusive area north of the main Hotel Zone.'
  },
  {
    id: 'villa-del-palmar',
    name: 'Villa del Palmar Cancun',
    description: 'A budget-friendly yet high-quality family resort. Recently renovated, it offers spacious suites and a warm, welcoming atmosphere perfect for large groups. Features the "Little Luxuries" program for kids.',
    priceRange: 'Budget',
    priceRangeValue: '$178 - $281 (pp)',
    isAllInclusive: true,
    travelTimeMinutes: 40,
    walkability: 'Low',
    resortSize: 'Large',
    kidsClubCost: 'Included',
    kidsClubHours: '9 AM - 5 PM',
    kidsClubAges: '4 - 12 years',
    amenities: ['5 Outdoor Pools', 'Kids Pool', 'Village Spa', 'Floating Aqua Park', 'Beach Volley'],
    dining: {
      restaurants: ['Davino (Italian)', 'Zamá (Mexican)', 'La Casona (Steakhouse)', 'Caprichos (World Cuisine)', 'Legends (Sports Bar)'],
      vegetarianFriendly: 'Good. Caprichos and Zamá offer a variety of vegetarian-friendly Mexican and international dishes.'
    },
    kidsClub: 'Arts & crafts, video games (Xbox, Nintendo Switch), and outdoor activities next to the kids pool.',
    activities: ['Aqua Park', 'Kayaking', 'Dance Lessons', 'Spanish Lessons', 'Nightly Entertainment'],
    roomOptions: [
      { type: 'Deluxe Suite', capacity: '4 Guests', description: 'Comfortable entry-level suite with kitchenette and garden/ocean views.', pricePerNight: 356 },
      { type: 'One Bedroom Family Suite', capacity: '4 Guests', description: 'Includes a separate living area and kitchenette.', pricePerNight: 480 },
      { type: 'Two Bedroom Family Suite', capacity: '6 Guests', description: 'Ideal for staying together as a larger family unit.', pricePerNight: 720 },
      { type: 'Three Bedroom Residence', capacity: '8 Guests', description: 'Large residence with full kitchen and expansive balcony.', pricePerNight: 1100 }
    ],
    bookingLink: 'https://www.villapalmarcancun.com/?partner=8932',
    highlights: ['Most cost-effective option', 'Little Luxuries program for kids', 'Fun floating aqua park'],
    specialOffers: 'Little Luxuries program; Kids stay free deals often available.',
    image: 'https://picsum.photos/seed/palmar/800/600',
    lat: 21.2215,
    lng: -86.8065,
    locationNote: 'Situated in the serene Playa Mujeres area, right next to Garza Blanca.'
  },
  {
    id: 'ava-resort',
    name: 'AVA Resort Cancun',
    description: 'A new standard for 5-star all-inclusive luxury. Every room is oceanfront, ensuring breathtaking views for every guest. Features a massive 2.8-acre saltwater lagoon.',
    priceRange: 'Luxury',
    priceRangeValue: '$313 - $864',
    isAllInclusive: true,
    travelTimeMinutes: 15,
    walkability: 'Low',
    resortSize: 'Large',
    kidsClubCost: 'Included*',
    kidsClubHours: 'Supervised Daily',
    kidsClubAges: '4 - 10 (Kids) / 11 - 17 (Teens)',
    amenities: ['Crystal Lagoons®', 'Oceanfront Promise™', 'Luxury Spa', 'Nightclub', 'Fitness Center', 'Waterpark'],
    dining: {
      restaurants: ['Nearly 30 Dining Venues', 'Signature Fine Dining', 'International Buffets', 'Artisanal Cocktails'],
      vegetarianFriendly: 'Very Good. Modern culinary techniques used to provide diverse dietary options across 30 venues.'
    },
    kidsClub: 'AVA Kids: Arts & crafts, nature walks, trampolines, and digital games. Separate Teen Lounge.',
    activities: ['Lagoon Sports', 'Bowling ($)', 'Laser Tag ($)', 'Escape Rooms ($)', 'Digital Art Installations'],
    roomOptions: [
      { type: 'Oceanfront King/Double', capacity: '4 Guests', description: 'Standard luxury with guaranteed ocean views.', pricePerNight: 313 },
      { type: 'Junior Suite', capacity: '4 Guests', description: 'Added living space with modern design.', pricePerNight: 450 },
      { type: 'Family Suite', capacity: '6 Guests', description: 'Designed specifically for families with bunk-bed areas.', pricePerNight: 680 },
      { type: 'AVA Villa', capacity: '8 Guests', description: 'The pinnacle of luxury for large groups.', pricePerNight: 2000 }
    ],
    bookingLink: 'https://www.avaresortcancun.com',
    highlights: ['1,600 Oceanfront rooms', '2.8-acre Saltwater Lagoon', 'Ultra-modern tech-forward design'],
    specialOffers: 'Brand new resort; 100% Oceanfront promise.',
    image: 'https://picsum.photos/seed/ava/800/600',
    lat: 21.0285,
    lng: -86.8455,
    locationNote: 'Located at the southern end of the Hotel Zone, very close to the airport.'
  },
  {
    id: 'hyatt-ziva',
    name: 'Hyatt Ziva Cancun',
    description: 'Located on the tip of the hotel zone, surrounded on three sides by the Caribbean Sea. Famous for its dolphin habitat and family-friendly "Evolution" of all-inclusive.',
    priceRange: 'Mid-Range',
    priceRangeValue: '$468 - $500',
    isAllInclusive: true,
    travelTimeMinutes: 25,
    walkability: 'High',
    resortSize: 'Large',
    kidsClubCost: 'Included',
    kidsClubHours: '9 AM - 9 PM',
    kidsClubAges: '4 - 12 years',
    amenities: ['3 Infinity Pools', 'Dolphin Habitat', 'Microbrewery', 'KidZ Club', 'Teen @Ziva'],
    dining: {
      restaurants: ['17 Restaurants & Bars', 'La Bastille (French)', 'The Moongate (Asian)', 'Lorenzo’s (Italian)', 'Habaneros (Tacos)'],
      vegetarianFriendly: 'Excellent. Well-known for accommodating all dietary restrictions with ease across 17 outlets.'
    },
    kidsClub: 'KidZ Club with beach/pool time, crafts, games, and a kids pool with slides.',
    activities: ['Dolphin Encounters', 'Snorkeling', 'Virtual Reality Lab', 'Live Theater', 'Pottery Painting'],
    roomOptions: [
      { type: 'Standard Room', capacity: '4 Guests', description: 'Spacious suites with private balconies and ocean views.', pricePerNight: 468 },
      { type: 'Swim-Up Suite', capacity: '4 Guests', description: 'Direct pool access from your terrace.', pricePerNight: 620 },
      { type: 'Two Bedroom Family Suite', capacity: '6 Guests', description: 'Connecting rooms designed for families.', pricePerNight: 850 },
      { type: 'Club Ocean Front', capacity: '4 Guests', description: 'Exclusive club level access and views.', pricePerNight: 720 }
    ],
    bookingLink: 'https://www.google.com/travel/search?q=hyatt%20ziva%20cancun',
    highlights: ['Unique dolphin habitat', 'Surrounded by ocean on 3 sides', 'Excellent KidZ Club programs'],
    specialOffers: 'No reservations required for dining; Free KidZ Club.',
    image: 'https://picsum.photos/seed/ziva/800/600',
    lat: 21.1375,
    lng: -86.7475,
    locationNote: 'Prime location at Punta Cancun, the very tip of the Hotel Zone. Walking distance to shops and nightlife.'
  },
  {
    id: 'moon-palace-the-grand',
    name: 'The Grand at Moon Palace',
    description: 'A massive, all-encompassing resort that feels like a city of its own. Offers unparalleled variety in dining and entertainment, with a huge focus on family fun.',
    priceRange: 'Luxury',
    priceRangeValue: '$721 - $1,148',
    isAllInclusive: true,
    travelTimeMinutes: 20,
    walkability: 'Low',
    resortSize: 'Massive',
    kidsClubCost: 'Included',
    kidsClubHours: '9 AM - 10 PM',
    kidsClubAges: '4 - 7 (Mezzanine) / 8 - 17 (Ground)',
    amenities: ['Massive Waterpark', 'Bowling Alley', '9 Outdoor Pools', 'Awe Spa', 'The Playroom'],
    dining: {
      restaurants: ['12+ Restaurants', 'Jade (Asian)', 'Tavola (Italian)', 'JC Steakhouse', 'Habibi (Lebanese)'],
      vegetarianFriendly: 'Very Good. The sheer number of restaurants ensures plenty of vegetarian options, including Lebanese and Asian.'
    },
    kidsClub: 'The Playroom: Arcade games, jungle gym, bumper cars, mini-golf, and mirror maze.',
    activities: ['Waterpark', 'Bowling', 'FlowRider® Double Wave Simulator', 'Nightly Shows', 'Laser Tag'],
    roomOptions: [
      { type: 'Grand Deluxe', capacity: '4 Guests', description: 'Elegant room with double whirlpool tub.', pricePerNight: 721 },
      { type: 'Grand Family Deluxe', capacity: '6 Guests', description: 'Two connecting rooms with special kids amenities.', pricePerNight: 1148 },
      { type: 'Grand Presidential Suite', capacity: '6 Guests', description: 'Ultra-luxurious with separate living and dining areas.', pricePerNight: 1600 },
      { type: 'Grand Swim-Up Suite', capacity: '4 Guests', description: 'Direct pool access from your terrace.', pricePerNight: 950 }
    ],
    bookingLink: 'https://thegrand.moonpalace.com/offers/resort-deals-all-inclusive',
    highlights: ['Kids & Teens stay free deals', 'Incredible waterpark and Playroom', 'Up to $250 Resort Credit'],
    specialOffers: 'Kids & Teens Stay Free; Up to $250 Resort Credit.',
    image: 'https://picsum.photos/seed/moon/800/600',
    lat: 21.0315,
    lng: -86.8485,
    locationNote: 'Located south of the airport in the Riviera Maya area. More isolated but self-contained.'
  }
];


