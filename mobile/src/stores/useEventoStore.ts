import { create } from 'zustand';

type EventoLocalState = {
  curtindoEventoId: string | null;
  participandoEventoId: string | null;
  setCurtindo: (id: string | null) => void;
  setParticipando: (id: string | null) => void;
};

export const useEventoStore = create<EventoLocalState>((set) => ({
  curtindoEventoId: null,
  participandoEventoId: null,
  setCurtindo: (id) => set({ curtindoEventoId: id }),
  setParticipando: (id) => set({ participandoEventoId: id }),
}));
