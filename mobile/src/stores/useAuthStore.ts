import { create } from 'zustand';
import { SessaoUsuario } from '../types';

type AuthState = {
  sessao: SessaoUsuario | null;
  setSessao: (sessao: SessaoUsuario | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  sessao: null,
  setSessao: (sessao) => set({ sessao }),
  logout: () => set({ sessao: null }),
}));
