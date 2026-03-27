import { useQuery } from '@tanstack/react-query';
import { buscarUsuario, listarEventosDoUsuario } from '../services/apiMock';

export function useUsuarioPerfil(usuarioId: string) {
  return useQuery({
    queryKey: ['usuario', usuarioId],
    queryFn: () => buscarUsuario(usuarioId),
    enabled: !!usuarioId,
  });
}

export function useEventosDoUsuario(usuarioId: string) {
  return useQuery({
    queryKey: ['eventosUsuario', usuarioId],
    queryFn: () => listarEventosDoUsuario(usuarioId),
    enabled: !!usuarioId,
  });
}
