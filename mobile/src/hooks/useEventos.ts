import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listarEventos,
  criarEvento,
  participarEvento,
  sairEvento,
  curtirEvento,
} from '../services/apiMock';
import { DadosCriarEvento } from '../types';

export function useEventos() {
  return useQuery({
    queryKey: ['eventos'],
    queryFn: listarEventos,
  });
}

export function useCriarEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dados,
      criadorId,
    }: {
      dados: DadosCriarEvento;
      criadorId: string;
    }) => criarEvento(dados, criadorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({ queryKey: ['eventosUsuario'] });
    },
  });
}

export function useParticiparEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventoId,
      usuarioId,
    }: {
      eventoId: string;
      usuarioId: string;
    }) => participarEvento(eventoId, usuarioId),
    onSuccess: (_data, variaveis) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({
        queryKey: ['eventos', variaveis.eventoId],
      });
      queryClient.invalidateQueries({ queryKey: ['eventosUsuario'] });
    },
  });
}

export function useSairEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventoId,
      usuarioId,
    }: {
      eventoId: string;
      usuarioId: string;
    }) => sairEvento(eventoId, usuarioId),
    onSuccess: (_data, variaveis) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({
        queryKey: ['eventos', variaveis.eventoId],
      });
      queryClient.invalidateQueries({ queryKey: ['eventosUsuario'] });
    },
  });
}

export function useCurtirEvento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventoId,
      usuarioId,
    }: {
      eventoId: string;
      usuarioId: string;
    }) => curtirEvento(eventoId, usuarioId),
    onSuccess: (_data, variaveis) => {
      queryClient.invalidateQueries({ queryKey: ['eventos'] });
      queryClient.invalidateQueries({
        queryKey: ['eventos', variaveis.eventoId],
      });
    },
  });
}
