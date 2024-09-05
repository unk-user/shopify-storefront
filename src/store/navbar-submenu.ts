import { create } from 'zustand';

interface SubmenuState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useSubmenu = create<SubmenuState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export default useSubmenu;
