'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  sku: string;
  name: string;
  category: string;
  scheme: 'Produk Satuan' | 'Paket Bundling';
  basePrice: number;
  unit: string;
  minOrder: number;
  imageUrl: string;
  quantity: number;
  variantId: string;
  variantName: string;
  variantAddPrice: number;
  needDesignService?: boolean;
  addOnLamination?: boolean;
  addOnGiftBox?: boolean;
  addOnExpress?: boolean;
  addOnLaminationName?: string;
  addOnLaminationPrice?: number;
  addOnGiftBoxName?: string;
  addOnGiftBoxPrice?: number;
  addOnExpressName?: string;
  addOnExpressPrice?: number;
  selectedAddons?: { name: string; price: number; description: string }[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    sku: string,
    variantId: string,
    needDesignService?: boolean,
    addOnLamination?: boolean,
    addOnGiftBox?: boolean,
    addOnExpress?: boolean
  ) => void;
  updateQty: (
    sku: string,
    variantId: string,
    quantity: number,
    needDesignService?: boolean,
    addOnLamination?: boolean,
    addOnGiftBox?: boolean,
    addOnExpress?: boolean
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper: compare items including all unique options
  const areItemsEqual = (a: CartItem, b: Partial<CartItem>) => {
    const addonNamesA = a.selectedAddons ? a.selectedAddons.map(x => x.name).sort().join('|') : '';
    const addonNamesB = b.selectedAddons ? b.selectedAddons.map(x => x.name).sort().join('|') : '';
    return a.sku === b.sku &&
           a.variantId === b.variantId &&
           (a.needDesignService || false) === (b.needDesignService || false) &&
           (a.addOnLamination || false) === (b.addOnLamination || false) &&
           (a.addOnGiftBox || false) === (b.addOnGiftBox || false) &&
           (a.addOnExpress || false) === (b.addOnExpress || false) &&
           addonNamesA === addonNamesB;
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('kertas_lipat_cart');
      if (storedCart) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('kertas_lipat_cart', JSON.stringify(cartItems));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [cartItems, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => areItemsEqual(item, newItem)
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
        return updatedItems;
      }

      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (
    sku: string,
    variantId: string,
    needDesignService?: boolean,
    addOnLamination?: boolean,
    addOnGiftBox?: boolean,
    addOnExpress?: boolean
  ) => {
    const match = { sku, variantId, needDesignService, addOnLamination, addOnGiftBox, addOnExpress };
    setCartItems((prevItems) =>
      prevItems.filter((item) => !areItemsEqual(item, match))
    );
  };

  const updateQty = (
    sku: string,
    variantId: string,
    quantity: number,
    needDesignService?: boolean,
    addOnLamination?: boolean,
    addOnGiftBox?: boolean,
    addOnExpress?: boolean
  ) => {
    const match = { sku, variantId, needDesignService, addOnLamination, addOnGiftBox, addOnExpress };
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        areItemsEqual(item, match) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
