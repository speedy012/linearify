import { create } from 'zustand'

export interface ControlsState {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean | ((prev: boolean) => boolean)) => void
  currentTrackUrl: string | null
  setCurrentTrackUrl: (currentTrackURl: string) => void

  error: { url: string; message: string } | null
  setError: (url: string, message: string) => void
  clearError: () => void
}

export const useControls = create<ControlsState>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying) =>
    set((state) => ({
      isPlaying: typeof isPlaying === 'function' ? isPlaying(state.isPlaying) : isPlaying,
    })),
  currentTrackUrl: null,
  setCurrentTrackUrl: (currentTrackUrl) =>
    set(() => ({
      currentTrackUrl,
    })),
  error: null,
  setError: (url, message) => set({ error: { url, message } }),
  clearError: () => set({ error: null }),
}))
