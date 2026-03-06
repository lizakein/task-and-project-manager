import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchState {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
}

const storeCreator: StateCreator<SearchState> = (set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
  clearQuery: () => set({ query: "" }),
});

export const useSearchStore = create<SearchState>()(
  persist(storeCreator, { name: "search-storage" })
);