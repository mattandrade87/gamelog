import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  buscarEvento,
  listarComentarios,
  adicionarComentario,
} from '../services/apiMock';

export function useEvento(eventoId: string) {
  return useQuery({
    queryKey: ['eventos', eventoId],
    queryFn: () => buscarEvento(eventoId),
    enabled: !!eventoId,
  });
}

export function useComentarios(eventoId: string) {
  return useQuery({
    queryKey: ['comentarios', eventoId],
    queryFn: () => listarComentarios(eventoId),
    enabled: !!eventoId,
  });
}

export function useAdicionarComentario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      eventoId,
      autorId,
      texto,
    }: {
      eventoId: string;
      autorId: string;
      texto: string;
    }) => adicionarComentario(eventoId, autorId, texto),
    onSuccess: (_data, variaveis) => {
      queryClient.invalidateQueries({
        queryKey: ['comentarios', variaveis.eventoId],
      });
    },
  });
}
