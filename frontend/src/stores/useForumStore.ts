import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import {ForumThread, ForumPost} from "@/types/forum";

interface ForumStore {
  currentThread: ForumThread | null;
  posts: ForumPost[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;

  fetchThreadById: (threadId: string) => Promise<void>;
  fetchPostsForThread: (threadId: string) => Promise<void>;
  createNewPost: (content: string, threadId: string) => Promise<void>;
  createThread: (data: { title: string; content: string }) => Promise<ForumThread>;
  reset: () => void;
  setSearchQuery: (query: string) => void;
}

export const useForumStore = create<ForumStore>((set) => ({
  currentThread: null,
  posts: [],
  isLoading: false,
  error: null,
  searchQuery: "",

  fetchThreadById: async (threadId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/forum/thread/${threadId}`);
      set({ currentThread: response.data, isLoading: false });
      await useForumStore.getState().fetchPostsForThread(threadId); // Fetch posts after fetching thread
    } catch (error: any) {
      set({ error: error.response?.data.message || "Error fetching thread", isLoading: false });
    }
  },

  fetchPostsForThread: async (threadId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/forum/posts/${threadId}`);
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data.message || "Error fetching posts", isLoading: false });
    }
  },

  createNewPost: async (content: string, threadId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/api/forum/post`, { content, threadId });
      set((state) => ({
        posts: [response.data, ...state.posts],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.response?.data.message || "Error creating post", isLoading: false });
    }
  },

  createThread: async ({ title, content }: { title: string; content: string }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/api/forum/thread`, { title, content });
      set({ isLoading: false });
      return response.data;
    } catch (error: any) {
      set({ error: error.response?.data.message || "Error creating thread", isLoading: false });
      throw error;
    }
  },

  reset: () => {
    set({ currentThread: null, posts: [], error: null, searchQuery: "", isLoading: false });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },
}));
