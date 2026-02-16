import { create } from "zustand";
import { supabase } from "@/app/lib/db";

export const useStore = create((set) => ({
  blog: [],
  member: [],
  banner: [],
  loading: false,
  error: null,
  fetchMember: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("member").select("*");
      if (error) throw error;
      set({ member: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchBanner: async () => {
    set({ loading: true, error: null });
    try {
      const { dataBanner, error } = await supabase.from("banner").select("title, link").limit(3);
      if (error) return set({ error: error.message, loading: false });
      set({ banner: dataBanner, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  insertMember: async (name, ign, nomerphone, status) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("member").insert({
        name,
        ign,
        nomerphone,
        status
      }).select().single()
      if (error) return set({ error: error.message, loading: false });
      set((state) => ({
        member: [...state.member, data],
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  insertBanner: async (title, link) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("banner").insert({
        title, link
      }).select().single()
      if (error) return set({ error: error.message, loading: false });
      set((state) => ({
        banner: [...state.banner, data],
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }

}))
