import { create } from 'zustand'

interface PreloaderStore {
  isDone: boolean
  setDone: () => void
}

export const usePreloaderStore = create<PreloaderStore>((set) => ({
  isDone: false,
  setDone: () => set({ isDone: true }),
}))
