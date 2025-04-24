import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from './types';
import { supabase } from './supabase';

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

interface CartStore {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ items: cartItems || [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (product: Product, quantity: number) => {
    set({ loading: true, error: null });
    try {
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert([{ product_id: product.id, quantity }]);

        if (error) throw error;
      }

      await get().fetchCart();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (itemId: string) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await get().fetchCart();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    set({ loading: true, error: null });
    try {
      if (quantity <= 0) {
        await get().removeItem(itemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      await get().fetchCart();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .neq('id', '');

      if (error) throw error;
      set({ items: [] });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      set({ loading: false });
    }
  },
}));