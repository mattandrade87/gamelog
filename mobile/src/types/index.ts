// ===================== USUARIO =====================
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  avatarUrl?: string;
  bio?: string;
};

// ===================== EVENTO =====================
export type CategoriaEvento =
  | 'MUSICA'
  | 'ESPORTE'
  | 'TECNOLOGIA'
  | 'GASTRONOMIA'
  | 'ARTE'
  | 'EDUCACAO'
  | 'OUTRO';

export const CATEGORIAS_LABELS: Record<CategoriaEvento, string> = {
  MUSICA: 'Musica',
  ESPORTE: 'Esporte',
  TECNOLOGIA: 'Tecnologia',
  GASTRONOMIA: 'Gastronomia',
  ARTE: 'Arte',
  EDUCACAO: 'Educacao',
  OUTRO: 'Outro',
};

export type Evento = {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  localizacao: string;
  imagemUrl: string;
  categoria: CategoriaEvento;
  criadorId: string;
  participantesIds: string[];
  curtidasIds: string[];
};

// ===================== COMENTARIO =====================
export type Comentario = {
  id: string;
  eventoId: string;
  autorId: string;
  texto: string;
  criadoEm: string;
};

// ===================== AUTH =====================
export type DadosLogin = {
  email: string;
  senha: string;
};

export type DadosRegistro = {
  nome: string;
  email: string;
  senha: string;
};

export type SessaoUsuario = {
  usuario: Usuario;
  token: string;
};

// ===================== FORM =====================
export type DadosCriarEvento = {
  titulo: string;
  descricao: string;
  data: string;
  localizacao: string;
  imagemUrl: string;
  categoria: CategoriaEvento;
};
