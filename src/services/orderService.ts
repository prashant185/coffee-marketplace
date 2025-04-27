import { Order, OrderSummary } from '../types';

// Mock buyer orders
const mockOrders: Order[] = [
  {
    id: "ORD123456",
    date: "2024-05-01T10:23:45Z",
    status: "Delivered",
    total: 42.97,
    items: [
      {
        name: "Ethiopian Yirgacheffe",
        imageUrl: "https://images.pexels.com/photos/4820769/pexels-photo-4820769.jpeg",
        price: 14.99,
        quantity: 2
      },
      {
        name: "Colombian Supremo",
        imageUrl: "https://images.pexels.com/photos/4820778/pexels-photo-4820778.jpeg",
        price: 12.99,
        quantity: 1
      }
    ]
  },
  {
    id: "ORD123457",
    date: "2024-05-10T14:15:30Z",
    status: "Shipped",
    total: 28.98,
    items: [
      {
        name: "Sumatra Mandheling",
        imageUrl: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg",
        price: 13.49,
        quantity: 2
      },
      {
        name: "Coffee Grinder",
        imageUrl: "https://images.pexels.com/photos/6103113/pexels-photo-6103113.jpeg",
        price: 1.99,
        quantity: 1
      }
    ]
  },
  {
    id: "ORD123458",
    date: "2024-05-18T09:45:12Z",
    status: "Processing",
    total: 55.96,
    items: [
      {
        name: "Guatemala Antigua",
        imageUrl: "https://images.pexels.com/photos/6103104/pexels-photo-6103104.jpeg",
        price: 13.99,
        quantity: 4
      }
    ]
  }
];

// Mock seller orders summary
const mockSellerOrders: OrderSummary[] = [
  {
    id: "ORD567890",
    date: "2024-05-02T11:20:45Z",
    status: "Delivered",
    total: 29.98,
    itemCount: 2,
    customerName: "John Smith",
    customerEmail: "john.smith@example.com"
  },
  {
    id: "ORD567891",
    date: "2024-05-12T16:30:22Z",
    status: "Shipped",
    total: 42.97,
    itemCount: 3,
    customerName: "Emily Johnson",
    customerEmail: "emily.j@example.com"
  },
  {
    id: "ORD567892",
    date: "2024-05-19T10:15:32Z",
    status: "Processing",
    total: 13.99,
    itemCount: 1,
    customerName: "Michael Brown",
    customerEmail: "michael.b@example.com"
  },
  {
    id: "ORD567893",
    date: "2024-05-20T14:45:11Z",
    status: "Processing",
    total: 27.98,
    itemCount: 2,
    customerName: "Sarah Wilson",
    customerEmail: "sarah.w@example.com"
  }
];

// Get orders for a buyer
export const getMockOrders = async (): Promise<Order[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

// Get order summaries for a seller
export const getMockSellerOrders = async (): Promise<OrderSummary[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockSellerOrders);
    }, 500);
  });
};

// Get a single order by ID
export const getMockOrder = async (id: string): Promise<Order | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const order = mockOrders.find(o => o.id === id);
      resolve(order || null);
    }, 500);
  });
};

// Create a new order (mock implementation)
export const createOrder = async (items: any[], total: number): Promise<Order> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        status: "Processing",
        total,
        items
      };
      
      resolve(newOrder);
    }, 1000);
  });
};