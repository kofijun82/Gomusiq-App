import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    name: string;
    email: string;
  } | null;
 // searchQuery: string;  // Added search query state
 // token: string | null;  // Added token state

  checkAdminStatus: () => Promise<void>;
 // setSearchQuery: (query: string) => void;  // Added method for updating search query
  setToken: (token: string) => void;  // Added method to store token
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  user: null,
 // searchQuery: "",  // Initialize search query
  token: null,  // Initialize token as null

  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.admin });
    } catch (error: any) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  //setSearchQuery: (query: string) => {
  //  set({ searchQuery: query });
 // },

  setToken: () => {  // Store the token in the store
    set({  });
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null,});
  },
}));
