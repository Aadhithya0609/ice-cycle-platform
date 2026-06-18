export const flavours = [
  { id: 'choc_cone', name: 'Chocolate Cone', price: 40, color: '#4E342E', image: 'https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 'mango_cup', name: 'Mango Cup', price: 30, color: '#FFB300', image: 'https://images.unsplash.com/photo-1505394033343-430c7b13a37d?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 'vanilla_bar', name: 'Vanilla Bar', price: 20, color: '#F5F5F5', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=200&h=200&auto=format&fit=crop' },
  { id: 'strawberry_bar', name: 'Strawberry Bar', price: 25, color: '#FF5252', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=200&h=200&auto=format&fit=crop' }
];

export const initialInventory = {
  choc_cone: 24,
  mango_cup: 12,
  vanilla_bar: 8,
  strawberry_bar: 15
};

export const CHENNAI_CENTER = [13.0827, 80.2707];

export const sellers = [
  { 
    id: 'seller_1', 
    name: 'Rajesh', 
    location: [13.0827, 80.2707], 
    status: 'ONLINE',
    inventory: { ...initialInventory },
    spoiled: { choc_cone: 0, mango_cup: 2, vanilla_bar: 0, strawberry_bar: 0 },
    hasEBike: true,
    financialStatus: 'Integrated',
    monsoonKit: 'Issued'
  },
  { 
    id: 'seller_2', 
    name: 'Saravana', 
    location: [13.0405, 80.2337], 
    status: 'ONLINE',
    inventory: { choc_cone: 10, mango_cup: 0, vanilla_bar: 5, strawberry_bar: 8 },
    spoiled: { choc_cone: 1, mango_cup: 0, vanilla_bar: 3, strawberry_bar: 0 },
    hasEBike: false,
    financialStatus: 'Pending',
    monsoonKit: 'Issued'
  }
];

export const demandHeatmap = [
  [13.0827, 80.2707, 0.8],
  [13.0405, 80.2337, 0.9],
  [12.9171, 80.2281, 0.5],
  [13.0067, 80.2206, 0.7],
  [13.1133, 80.2444, 0.4]
];
