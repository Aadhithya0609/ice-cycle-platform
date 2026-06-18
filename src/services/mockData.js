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

export const sellers = [
  { 
    id: 'seller_1', 
    name: 'Rajesh', 
    location: { lat: 13.0827, lng: 80.2707 }, 
    status: 'ONLINE',
    inventory: { ...initialInventory }
  },
  { 
    id: 'seller_2', 
    name: 'Saravana', 
    location: { lat: 13.0850, lng: 80.2750 }, 
    status: 'ONLINE',
    inventory: { choc_cone: 10, mango_cup: 0, vanilla_bar: 5, strawberry_bar: 8 }
  }
];
