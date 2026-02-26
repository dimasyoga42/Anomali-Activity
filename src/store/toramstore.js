import { supabase } from "@/app/lib/db";
import { create } from "zustand";
export const toramstore = create((set) => ({
  bos: [],
  xtal: [],
  ability: [],
  regis: [],
  item: [],
  appview: [],
  error: null,
  loading: false,

  //xtal area
  fetchXtal: async () => {
    set({ loading: true, error: null });
    const data = await supabase.from("xtall").select("*");
    set({ xtal: data, loading: false });
  },

  //ability area
  fetchAbility: async () => {
    set({ loading: true, error: null });
    try {
      const data = await supabase.from("ability").select("*");
      set({ ability: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  //bos area
  fetchBos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await supabase.from("bosdef").select("*");
      set({ bos: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  //regis area
  fetchRegis: async () => {
    set({ loading: true, error: null });
    try {
      const data = await supabase.from("regist").select("*");
      set({ regis: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  //item area
  fetchItem: async () => {
    set({ loading: true, error: null });
    try {
      const data = await supabase.from("items").select("*");
      set({ item: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  //appview area
  fetchAppview: async () => {
    set({ loading: true, error: null });
    try {
      const data = await supabase.from("appview").select("*");
      set({ appview: data, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
}));
