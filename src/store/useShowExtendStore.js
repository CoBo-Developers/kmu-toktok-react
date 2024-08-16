import { create } from "zustand";

const useShowExtendStore = create((set) => ({
  showExtend: false,
  setShowExtend: (newShowExtend) => set({ showExtend: newShowExtend })
}))

export default useShowExtendStore;