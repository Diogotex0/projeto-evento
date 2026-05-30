export const EVENT_TYPES = [
  { value: "casamento", label: "Casamento", emoji: "💍" },
  { value: "aniversario", label: "Aniversário", emoji: "🎂" },
  { value: "formatura", label: "Formatura", emoji: "🎓" },
  { value: "cha-de-bebe", label: "Chá de Bebê", emoji: "👶" },
  { value: "festa", label: "Festa", emoji: "🎉" },
  { value: "corporativo", label: "Corporativo", emoji: "💼" },
  { value: "outro", label: "Outro", emoji: "✨" },
] as const;

export const RSVP_STATUS = {
  confirmado: { label: "Confirmado", color: "green" },
  pendente: { label: "Pendente", color: "yellow" },
  recusado: { label: "Recusado", color: "red" },
} as const;

export const ROUTES = {
  home: "/",
  login: "/login",
  cadastro: "/cadastro",
  recuperarSenha: "/recuperar-senha",
  dashboard: "/dashboard",
  eventos: "/eventos",
  criarEvento: "/eventos/criar",
  evento: (id: string) => `/eventos/${id}`,
  eventoPublico: (id: string) => `/evento/${id}`,
  convidados: "/convidados",
  presentes: "/presentes",
  cronograma: "/cronograma",
  pix: "/pix",
} as const;
