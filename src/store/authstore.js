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
  editDatauser: async (name, ign, username, image_url) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("userlogin").update({
        name,
        ign,
        image_url
      }).eq("username", username).select().single();
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
      const { data, error } = await supabase.from("userlogin").select("id, name, ign, role, image_url");
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

  editMember: async (id, name, ign, image_url, role) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("userlogin").update({
        name,
        ign,
        image_url,
        role,
      }).eq("id", id).select().single()
      if (error) return set({ error: error.message, loading: false });
      set((state) => ({
        member: state.member.map(m => m.id === id ? data : m),
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
  },
  insertBlog: async (title, desc, isi, author_id) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("blog").insert({
        title, desc, isi, author_id
      }).select().single()
      if (error) throw error;
      set((state) => ({
        blog: [...state.blog, data],
        loading: false,
      }))
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  viewBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from("blogDB").select("title, desc, isi, author_id").eq("id", id).single();
      const { data: authorData, error: authorError } = await supabase.from("userlogin").select("name").eq("id", data.author_id).single();
      if (error) throw error;
      if (authorError) throw authorError;
      set({ blog: { ...data, author_name: authorData.name }, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }

}))
