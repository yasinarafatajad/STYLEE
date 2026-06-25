export interface Product {
  id: string;
  name: string;
  price: number; // in BDT
  originalPrice?: number; // for discounts
  image: string;
  category: 'Men' | 'Women' | 'Accessories' | 'Footwear' | 'Lifestyle';
  tags: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isFlashSale?: boolean;
  stockLeft?: number;
  totalStock?: number;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  image: string; // 3:4 aspect ratio streetwear style
  text: string;
  rating: number;
  productName: string;
  sizeBought: string;
  asymmetryClass: string; // Dynamic asymmetrical border styling class
}

export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

