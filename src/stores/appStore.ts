import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  displayName: string
}

export interface Team {
  id: string
  name: string
  inviteCode: string
}

interface AppState {
  // Auth
  user: User | null
  setUser: (user: User | null) => void

  // Team
  team: Team | null
  setTeam: (team: Team | null) => void

  // UI state
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      team: null,
      setTeam: (team) => set({ team }),

      sidebarOpen: true,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({ user: state.user, team: state.team }),
    }
  )
)
