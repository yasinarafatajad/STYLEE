import { Product, Review, HeroSlide } from './types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=90',
    alt: 'High Contrast Oversized Hoodies Streetwear'
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=90',
    alt: 'Premium Monochrome Editorial Fashion'
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=90',
    alt: 'Raw Utility Cargo Campaign'
  },
  {
    id: 'slide-4',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=1600&q=90',
    alt: 'Luxury Earthtone Distressed Outerwear'
  }
];

export const CATEGORIES = [
  {
    name: "Men's Fashion",
    id: "Men",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    count: "48 Items"
  },
  {
    name: "Women's Fashion",
    id: "Women",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80",
    count: "36 Items"
  },
  {
    name: "Accessories",
    id: "Accessories",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    count: "18 Items"
  },
  {
    name: "Footwear",
    id: "Footwear",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    count: "24 Items"
  },
  {
    name: "Lifestyle",
    id: "Lifestyle",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    count: "12 Items"
  }
];

export const PRODUCTS: Product[] = [
  // New Arrivals
  {
    id: 'p1',
    name: 'MOTO JERSEY OVERSIZED HOODIE',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    tags: ['New', 'Oversized'],
    isNew: true,
    isTrending: true,
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'REPRESENT ARCHIVE SWEATPANTS',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    tags: ['New', 'Heavyweight'],
    isNew: true,
    rating: 4.7
  },
  {
    id: 'p3',
    name: 'TERRAIN CARGO PANTS - MATTE BLACK',
    price: 7500,
    image: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    tags: ['New', 'Utility'],
    isNew: true,
    isBestSeller: true,
    rating: 4.9
  },
  {
    id: 'p4',
    name: 'ESSENTIAL BOXY TEE - OFF WHITE',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    tags: ['New', 'Minimalist'],
    isNew: true,
    rating: 4.6
  },
  
  // Flash Sale
  {
    id: 'p5',
    name: 'DISTRESSED OVERSIZED DENIM JACKET',
    price: 9200,
    originalPrice: 14000,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    tags: ['Sale', 'Acidwash'],
    isFlashSale: true,
    stockLeft: 14,
    totalStock: 50,
    rating: 4.8
  },
  {
    id: 'p6',
    name: 'APEX RUNNER TECH SNEAKERS',
    price: 14500,
    originalPrice: 19500,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    category: 'Footwear',
    tags: ['Sale', 'Techwear'],
    isFlashSale: true,
    stockLeft: 8,
    totalStock: 30,
    rating: 4.9
  },
  {
    id: 'p7',
    name: 'SIGNATURE INDUSTRIAL CHEST RIG',
    price: 4200,
    originalPrice: 6500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'Lifestyle',
    tags: ['Sale', 'Tactical'],
    isFlashSale: true,
    stockLeft: 19,
    totalStock: 40,
    rating: 4.5
  },

  // Best Sellers (8 items)
  {
    id: 'p8',
    name: 'ACID WASH CLUB CRWN SWEATER',
    price: 6800,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    tags: ['Best Seller'],
    isBestSeller: true,
    isTrending: true,
    rating: 4.9
  },
  {
    id: 'p9',
    name: 'STUDIO REVERSIBLE SHEARLING JACKET',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    tags: ['Best Seller', 'Luxury'],
    isBestSeller: true,
    rating: 5.0
  },
  {
    id: 'p10',
    name: 'STREET BUCKET CAP - ONYX',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    tags: ['Best Seller'],
    isBestSeller: true,
    rating: 4.6
  },
  {
    id: 'p11',
    name: 'HEAVYWEIGHT BEANIE - BOLD RED',
    price: 1900,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d4aa53e?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    tags: ['Best Seller'],
    isBestSeller: true,
    isTrending: true,
    rating: 4.7
  },
  {
    id: 'p12',
    name: 'SIGNATURE STEEL LINK COLLAR',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
    tags: ['Best Seller'],
    isBestSeller: true,
    rating: 4.8
  },
  {
    id: 'p13',
    name: 'VINTAGE WASH RELAXED TRACK PANTS',
    price: 5400,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
    category: 'Women',
    tags: ['Best Seller'],
    isBestSeller: true,
    rating: 4.7
  },
  {
    id: 'p14',
    name: 'MOTO RACER LEATHER BOOTS',
    price: 15900,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'Footwear',
    tags: ['Best Seller', 'Leather'],
    isBestSeller: true,
    isTrending: true,
    rating: 4.9
  },
  {
    id: 'p15',
    name: 'TERRAIN DUFFLE BACKPACK',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    category: 'Lifestyle',
    tags: ['Best Seller'],
    isBestSeller: true,
    rating: 4.8
  },

  // Trending (Filterable)
  {
    id: 'p16',
    name: 'HEAVY DROP-SHOULDER HOODIE',
    price: 5900,
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    category: 'Men',
    tags: ['Trending', 'Heavyweight'],
    isTrending: true,
    rating: 4.8
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Fariha Rahman',
    handle: '@fariha.rmn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80',
    text: 'Absolutely in love with the Moto Jersey Hoodie! The oversized fit is incredibly structured, heavy weight fabric that feels exactly like a high-end luxury brand. STYLEE is doing amazing stuff.',
    rating: 5,
    productName: 'MOTO JERSEY OVERSIZED HOODIE',
    sizeBought: 'M / Off-Black',
    asymmetryClass: 'rounded-[60px_16px_60px_16px]'
  },
  {
    id: 'rev-2',
    name: 'Zayn Al-Hasan',
    handle: '@zaynalh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80',
    text: 'Bought the Terrain Cargos. The custom zipper utility pockets and high quality matte black nylon feel unmatched in Dhaka. Delivery took less than 24 hours too. Highly recommended.',
    rating: 5,
    productName: 'TERRAIN CARGO PANTS',
    sizeBought: 'L / Matte Black',
    asymmetryClass: 'rounded-[16px_60px_16px_60px]'
  },
  {
    id: 'rev-3',
    name: 'Maliha Ahmed',
    handle: '@maliha_ah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80',
    text: 'The Reversible Shearling Jacket is a complete showstopper. The premium suede texture on one side and the premium warm fleece on the other make this the only winter jacket I need.',
    rating: 5,
    productName: 'STUDIO REVERSIBLE SHEARLING JACKET',
    sizeBought: 'S / Cream Sand',
    asymmetryClass: 'rounded-[60px_60px_16px_60px]'
  },
  {
    id: 'rev-4',
    name: 'Nafis Chowdhury',
    handle: '@nafis_ch',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80',
    text: 'Apex Runner Tech Sneakers exceeded my expectations. Outstanding comfort coupled with a highly technical and bold futuristic style. Worth every single taka.',
    rating: 5,
    productName: 'APEX RUNNER TECH SNEAKERS',
    sizeBought: '42 / Onyx Red',
    asymmetryClass: 'rounded-[16px_16px_60px_60px]'
  },
  {
    id: 'rev-5',
    name: 'Samira Huq',
    handle: '@samirahq',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&h=150&q=80',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&h=800&q=80',
    text: 'Fitted out entirely in STYLEE for my latest photoshoot. The boxy tee is heavy drop shoulder with seamless neck ribbing. Definitely ordering more essentials.',
    rating: 4.8,
    productName: 'ESSENTIAL BOXY TEE',
    sizeBought: 'M / Off White',
    asymmetryClass: 'rounded-[60px_16px_16px_60px]'
  }
];

export const INSTAGRAM_IMAGES = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    tag: '@zaynalh'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    tag: '@fariha.rmn'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
    tag: '@nafis_ch'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
    tag: '@maliha_ah'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
    tag: '@samirahq'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
    tag: '@stylee_community'
  }
];
