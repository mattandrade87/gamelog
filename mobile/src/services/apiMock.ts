import {
  Usuario,
  Evento,
  Comentario,
  DadosLogin,
  DadosRegistro,
  SessaoUsuario,
  DadosCriarEvento,
} from '../types';
import {
  mockUsuarios,
  mockEventos,
  mockComentarios,
} from '../data/mockDados';

// Estado mutavel em memoria (simula banco de dados)
let usuarios: Usuario[] = [...mockUsuarios];
let eventos: Evento[] = [...mockEventos];
let comentarios: Comentario[] = [...mockComentarios];

// Helper para simular latencia de rede
const atraso = (ms: number = 500) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// Helper para gerar IDs unicos
let contadorId = 100;
const gerarId = (prefixo: string) => `${prefixo}${++contadorId}`;

// ===================== AUTH =====================

export async function login(dados: DadosLogin): Promise<SessaoUsuario> {
  await atraso(800);

  const usuario = usuarios.find(
    (u) => u.email === dados.email && u.senha === dados.senha
  );

  if (!usuario) {
    throw new Error('Credenciais invalidas. Verifique seu email e senha.');
  }

  return {
    usuario,
    token: `fake-jwt-token-${usuario.id}`,
  };
}

export async function registrar(dados: DadosRegistro): Promise<SessaoUsuario> {
  await atraso(800);

  const emailExiste = usuarios.some((u) => u.email === dados.email);
  if (emailExiste) {
    throw new Error('Este email ja esta cadastrado.');
  }

  const novoUsuario: Usuario = {
    id: gerarId('u'),
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    bio: '',
  };

  usuarios.push(novoUsuario);

  return {
    usuario: novoUsuario,
    token: `fake-jwt-token-${novoUsuario.id}`,
  };
}

// ===================== EVENTOS =====================

export async function listarEventos(): Promise<Evento[]> {
  await atraso(600);

  return [...eventos].sort(
    (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
  );
}

export async function buscarEvento(eventoId: string): Promise<Evento> {
  await atraso(400);

  const evento = eventos.find((e) => e.id === eventoId);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }

  return { ...evento };
}

export async function criarEvento(
  dados: DadosCriarEvento,
  criadorId: string
): Promise<Evento> {
  await atraso(700);

  const novoEvento: Evento = {
    id: gerarId('e'),
    titulo: dados.titulo,
    descricao: dados.descricao,
    data: dados.data,
    localizacao: dados.localizacao,
    imagemUrl: dados.imagemUrl || 'https://picsum.photos/seed/novo/400/200',
    categoria: dados.categoria,
    criadorId,
    participantesIds: [criadorId],
    curtidasIds: [],
  };

  eventos.unshift(novoEvento);

  return novoEvento;
}

export async function participarEvento(
  eventoId: string,
  usuarioId: string
): Promise<Evento> {
  await atraso(400);

  const evento = eventos.find((e) => e.id === eventoId);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }

  if (!evento.participantesIds.includes(usuarioId)) {
    evento.participantesIds.push(usuarioId);
  }

  return { ...evento };
}

export async function sairEvento(
  eventoId: string,
  usuarioId: string
): Promise<Evento> {
  await atraso(400);

  const evento = eventos.find((e) => e.id === eventoId);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }

  evento.participantesIds = evento.participantesIds.filter(
    (id) => id !== usuarioId
  );

  return { ...evento };
}

export async function curtirEvento(
  eventoId: string,
  usuarioId: string
): Promise<Evento> {
  await atraso(300);

  const evento = eventos.find((e) => e.id === eventoId);
  if (!evento) {
    throw new Error('Evento nao encontrado.');
  }

  const indice = evento.curtidasIds.indexOf(usuarioId);
  if (indice === -1) {
    evento.curtidasIds.push(usuarioId);
  } else {
    evento.curtidasIds.splice(indice, 1);
  }

  return { ...evento };
}

// ===================== COMENTARIOS =====================

export async function listarComentarios(
  eventoId: string
): Promise<Comentario[]> {
  await atraso(400);

  return comentarios
    .filter((c) => c.eventoId === eventoId)
    .sort(
      (a, b) =>
        new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime()
    );
}

export async function adicionarComentario(
  eventoId: string,
  autorId: string,
  texto: string
): Promise<Comentario> {
  await atraso(500);

  const novoComentario: Comentario = {
    id: gerarId('c'),
    eventoId,
    autorId,
    texto,
    criadoEm: new Date().toISOString(),
  };

  comentarios.push(novoComentario);

  return novoComentario;
}

// ===================== USUARIO =====================

export async function buscarUsuario(usuarioId: string): Promise<Usuario> {
  await atraso(400);

  const usuario = usuarios.find((u) => u.id === usuarioId);
  if (!usuario) {
    throw new Error('Usuario nao encontrado.');
  }

  return { ...usuario };
}

export async function listarEventosDoUsuario(
  usuarioId: string
): Promise<{ criados: Evento[]; participando: Evento[] }> {
  await atraso(500);

  const criados = eventos.filter((e) => e.criadorId === usuarioId);
  const participando = eventos.filter(
    (e) =>
      e.participantesIds.includes(usuarioId) && e.criadorId !== usuarioId
  );

  return { criados, participando };
}

// Helper para buscar nome do usuario (usado nos comentarios)
export function buscarNomeUsuarioSync(usuarioId: string): string {
  const usuario = usuarios.find((u) => u.id === usuarioId);
  return usuario?.nome ?? 'Usuario desconhecido';
}
