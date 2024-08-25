import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  closeSidebar: () => void;
  openSidebar: () => void;
  changeSidebarState: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  closeSidebar: () => set({ isOpen: false }),
  openSidebar: () => set({ isOpen: true }),
  changeSidebarState: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
