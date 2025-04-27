import { CoffeeProduct, Review } from '../types';

// Mock data for products
const mockProducts: CoffeeProduct[] = [
  {
    id: "p1",
    name: "Ethiopian Yirgacheffe",
    origin: "Ethiopia",
    description: "A bright and complex coffee with floral and citrus notes. Grown in the highlands of Ethiopia, this coffee is known for its distinctive floral bouquet and bright acidity.",
    price: 14.99,
    imageUrl: "https://images.pexels.com/photos/4820769/pexels-photo-4820769.jpeg",
    stockQuantity: 50,
    soldQuantity: 15,
    roastLevel: "Light",
    process: "Washed",
    flavorNotes: ["Jasmine", "Lemon", "Bergamot", "Honey"],
    isOrganic: true,
    acidity: "High",
    body: "Light",
    altitude: "1,900 - 2,200 MASL",
    farm: "Various smallholder farms",
    harvestPeriod: "October - December",
    varieties: "Heirloom",
    rating: 4.8,
    seller: "Sunshine Roasters"
  },
  {
    id: "p2",
    name: "Colombian Supremo",
    origin: "Colombia",
    description: "A balanced and smooth coffee with notes of caramel and chocolate. Grown in the Huila region of Colombia, this coffee offers the classic Colombian profile with a rich sweetness.",
    price: 12.99,
    imageUrl: "https://images.pexels.com/photos/4820778/pexels-photo-4820778.jpeg",
    stockQuantity: 75,
    soldQuantity: 25,
    roastLevel: "Medium",
    process: "Washed",
    flavorNotes: ["Caramel", "Chocolate", "Hazelnut", "Red Apple"],
    isOrganic: false,
    acidity: "Medium",
    body: "Medium",
    altitude: "1,600 - 1,900 MASL",
    farm: "El Paraiso",
    harvestPeriod: "April - July",
    varieties: "Castillo, Colombia",
    rating: 4.5,
    seller: "Mountain Peak Coffee"
  },
  {
    id: "p3",
    name: "Sumatra Mandheling",
    origin: "Indonesia",
    description: "A full-bodied, earthy coffee with low acidity and notes of cedar and spice. This coffee undergoes wet-hulling, a unique processing method that contributes to its distinctive character.",
    price: 13.49,
    imageUrl: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg",
    stockQuantity: 30,
    soldQuantity: 10,
    roastLevel: "Dark",
    process: "Wet-Hulled",
    flavorNotes: ["Cedar", "Spice", "Dark Chocolate", "Earthy"],
    isOrganic: false,
    acidity: "Low",
    body: "Full",
    altitude: "1,200 - 1,500 MASL",
    farm: "Various smallholder farms",
    varieties: "Ateng, Jember",
    rating: 4.3,
    seller: "Pacific Traders"
  },
  {
    id: "p4",
    name: "Costa Rican Tarrazu",
    origin: "Costa Rica",
    description: "A clean and bright coffee with notes of citrus and honey. Grown in the Tarrazu region, known for producing some of Costa Rica's finest coffees.",
    price: 14.29,
    imageUrl: "https://images.pexels.com/photos/2536991/pexels-photo-2536991.jpeg",
    stockQuantity: 40,
    soldQuantity: 18,
    roastLevel: "Medium",
    process: "Washed",
    flavorNotes: ["Orange", "Honey", "Almond", "Toffee"],
    isOrganic: true,
    acidity: "Medium-High",
    body: "Medium",
    altitude: "1,400 - 1,800 MASL",
    farm: "La Pastora",
    harvestPeriod: "December - March",
    varieties: "Caturra, Catuai",
    rating: 4.6,
    seller: "Tropical Beans Co."
  },
  {
    id: "p5",
    name: "Kenyan AA",
    origin: "Kenya",
    description: "A bold and juicy coffee with complex fruity acidity and notes of blackcurrant and tomato. Kenyan coffees are known for their distinctive winey acidity and full flavor.",
    price: 15.99,
    imageUrl: "https://images.pexels.com/photos/2363305/pexels-photo-2363305.jpeg",
    stockQuantity: 25,
    soldQuantity: 12,
    roastLevel: "Medium-Light",
    process: "Washed",
    flavorNotes: ["Blackcurrant", "Tomato", "Blackberry", "Brown Sugar"],
    isOrganic: false,
    acidity: "High",
    body: "Medium-Full",
    altitude: "1,700 - 2,000 MASL",
    varieties: "SL28, SL34, Ruiru 11",
    rating: 4.7,
    seller: "Safari Roasters"
  },
  {
    id: "p6",
    name: "Guatemala Antigua",
    origin: "Guatemala",
    description: "A rich and complex coffee with notes of chocolate, caramel, and spice. Grown in the Antigua Valley, surrounded by volcanoes, which contribute to the rich soil.",
    price: 13.99,
    imageUrl: "https://images.pexels.com/photos/6103104/pexels-photo-6103104.jpeg",
    stockQuantity: 35,
    soldQuantity: 15,
    roastLevel: "Medium-Dark",
    process: "Washed",
    flavorNotes: ["Chocolate", "Caramel", "Cinnamon", "Orange"],
    isOrganic: false,
    acidity: "Medium",
    body: "Medium-Full",
    altitude: "1,500 - 1,700 MASL",
    farm: "La Flor del Café",
    harvestPeriod: "January - March",
    varieties: "Bourbon, Caturra",
    rating: 4.5,
    seller: "Maya Coffee Traders"
  }
];

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Coffee Lover",
    rating: 5,
    title: "Best Ethiopian I've tried!",
    content: "This Yirgacheffe has incredible floral and citrus notes. The aroma alone is worth the price. I brewed it using a V60 and it was absolutely delightful.",
    date: "2024-04-15T14:32:00Z"
  },
  {
    id: "r2",
    productId: "p1",
    userId: "u2",
    userName: "Jane Smith",
    rating: 4,
    title: "Excellent but pricey",
    content: "The flavor profile is amazing - very complex and aromatic. I only wish it was a bit more affordable for everyday drinking. Nevertheless, it's a treat for special mornings.",
    date: "2024-04-02T09:15:00Z"
  },
  {
    id: "r3",
    productId: "p1",
    userId: "u3",
    userName: "Barista Bob",
    rating: 5,
    title: "Exceptional quality",
    content: "As a barista, I'm quite picky about my coffee. This Ethiopian bean is exceptional - perfect acidity, amazing aroma, and it makes a fantastic pour-over. Highly recommended!",
    date: "2024-03-27T16:45:00Z"
  }
];

// Get all mock products
export const getMockProducts = async (): Promise<CoffeeProduct[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 500);
  });
};

// Get a single mock product by ID
export const getMockProduct = async (id: string): Promise<CoffeeProduct> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    }, 500);
  });
};

// Get reviews for a product
export const getMockReviews = async (productId: string): Promise<Review[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const reviews = mockReviews.filter(r => r.productId === productId);
      resolve(reviews);
    }, 500);
  });
};

// Get products for a seller
export const getMockSellerProducts = async (): Promise<CoffeeProduct[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockProducts.slice(0, 3));
    }, 500);
  });
};

// Add a new product (mock implementation)
export const addProduct = async (product: Partial<CoffeeProduct>): Promise<CoffeeProduct> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newProduct: CoffeeProduct = {
        id: `p${mockProducts.length + 1}`,
        name: product.name || "",
        origin: product.origin || "",
        description: product.description || "",
        price: product.price || 0,
        imageUrl: product.imageUrl || "",
        stockQuantity: product.stockQuantity || 0,
        soldQuantity: 0,
        roastLevel: product.roastLevel || "",
        process: product.process || "",
        flavorNotes: product.flavorNotes || [],
        isOrganic: product.isOrganic || false,
        acidity: product.acidity || "",
        body: product.body || "",
        altitude: product.altitude || "",
        farm: product.farm,
        harvestPeriod: product.harvestPeriod,
        varieties: product.varieties,
        roastDate: product.roastDate,
        rating: 0,
        seller: "Your Coffee Shop"
      };
      
      resolve(newProduct);
    }, 1000);
  });
};