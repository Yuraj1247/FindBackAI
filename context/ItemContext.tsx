import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Item, ClaimRequest, ItemStatus } from '../types';

interface ItemContextType {
  items: Item[];
  addItem: (item: Item) => void;
  getItem: (id: string) => Item | undefined;
  deleteItem: (id: string) => void;
  updateItemDetails: (id: string, updates: Partial<Item>) => void;
  submitClaim: (id: string, data: ClaimRequest) => void;
  updateStatus: (id: string, status: ItemStatus) => void;
  rejectClaim: (id: string) => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

const STORAGE_KEY = 'lfis_items_v3';

const DEMO_ITEMS: Item[] = [
  {
    id: 'demo-1',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=1000',
    category: 'Water Bottle',
    description: 'Blue metal Hydroflask found on the bleachers. Has a "National Park" sticker and a dent on the bottom.',
    location: 'Campus Gym',
    date: new Date().toISOString(),
    status: 'found',
    colors: ['Blue', 'Silver'],
    reporterPhone: '9876543210',
    reporterEmail: 'gym.staff@college.edu'
  },
  {
    id: 'demo-2',
    imageUrl: 'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?auto=format&fit=crop&q=80&w=1000',
    category: 'Electronics',
    description: 'White Apple AirPods Pro case. Found on Table 4 in the Quiet Zone. Case only, no buds inside.',
    location: 'Library - 2nd Floor',
    date: new Date(Date.now() - 86400000).toISOString(),
    status: 'found',
    colors: ['White'],
    reporterPhone: '9876543210',
    claimRequest: {
      claimerName: 'Alex Mercer',
      contactNumber: '555-0199',
      description: 'I lost the case while studying. It has a small scratch near the charging port.',
      requestDate: new Date().toISOString()
    }
  },
  {
    id: 'demo-3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqzSyYHJNG0pDp1ywor07bGtAv03t2wEM-JQ&s',
    category: 'ID Cards',
    description: 'Student ID card found near the Vending Machines. Name on card: "Rohan Das".',
    location: 'Student Center',
    date: new Date(Date.now() - 172800000).toISOString(),
    status: 'found',
    colors: ['White', 'Green'],
    detectedText: 'Rohan Das ID: 1905387',
    reporterPhone: '1122334455',
    claimRequest: {
      claimerName: 'Rohan Das',
      contactNumber: '555-0987',
      description: 'My ID number ends in 5387. I left it while grabbing a snack.',
      requestDate: new Date().toISOString()
    }
  },
  {
     id: 'demo-4',
     imageUrl: 'https://www.theodist.com/Images/ProductImages/Original/FX100.jpg',
     category: 'Electronics',
     description: 'Black scientific calculator (Casio FX-100MS). Left on the desk in the back row after Calculus 101.',
     location: 'Science Block - Room 304',
     date: new Date(Date.now() - 250000000).toISOString(),
     status: 'found',
     colors: ['Black', 'Grey'],
     reporterPhone: '5551234567'
  }
];

export const ItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEMO_ITEMS;
      const parsed = JSON.parse(saved);
      return parsed.length === 0 ? DEMO_ITEMS : parsed;
    } catch (e) {
      return DEMO_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Item) => {
    setItems(prev => [item, ...prev]);
  };

  const getItem = (id: string) => {
    return items.find(i => i.id === id);
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateItemDetails = (id: string, updates: Partial<Item>) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...updates };
      }
      return item;
    }));
  };

  const submitClaim = (id: string, data: ClaimRequest) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'claim_requested', claimRequest: data };
      }
      return item;
    }));
  };

  const updateStatus = (id: string, status: ItemStatus) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status };
      }
      return item;
    }));
  };

  const rejectClaim = (id: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const { claimRequest, ...rest } = item;
        return { ...rest, status: 'found' };
      }
      return item;
    }));
  };

  return (
    <ItemContext.Provider value={{ items, addItem, getItem, deleteItem, updateItemDetails, submitClaim, updateStatus, rejectClaim }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
};