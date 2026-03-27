export type AuthStackParamList = {
  Login: undefined;
  Registro: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  CriarEvento: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  DetalhesEvento: { eventoId: string };
};
