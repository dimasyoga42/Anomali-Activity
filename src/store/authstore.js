import { create } from "zustand";
import { supabase } from "@/app/lib/db";
import { redirect } from "next/navigation";
export const useAnomaliStore = create((set) => ({
  blog: [],
  member: [],
  user: [],
  banner: [],
  register: [],
  loading: false,
  error: null,
  userRegister: async (name, ign, username, password) => {
    set({ loading: true, error: null });
    try {
      const image_url = "https://i.ibb.co/0yftxyHT/PP-kosong.jpg"
      const role = "member";
      const { data, error } = await supabase.from("userlogin").insert({
        image_url,
        name,
        ign,
        username,
        password,
        role
      }).select().single()
      if (error) throw error;
      set((state) => ({
        register: [...state.register, data],
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  fetchDatauser: async (username) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("userlogin").select("*").eq("username", username).single();
      if (error) throw error;
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  editDatauser: async (name, ign, image_url) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("userlogin").update({
        name,
        ign,
        image_url
      }).eq("name", name).select().single();
      if (error) throw error;
      set((state) => ({
        user: data,
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
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
