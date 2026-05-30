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

export const FAKE_QR_SVG = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48ZyBmaWxsPSIjMTExODI3Ij48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjQiLz48cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcng9IjIiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyIi8+PHJlY3QgeD0iMjUiIHk9IjI1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxyZWN0IHg9IjEzMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjQiLz48cmVjdCB4PSIxMzUiIHk9IjE1IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjIiLz48cmVjdCB4PSIxNDUiIHk9IjI1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE1MCIgeT0iMzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSI0Ii8+PHJlY3QgeD0iMTUiIHk9IjEzNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIyMCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyIi8+PHJlY3QgeD0iMjUiIHk9IjE0NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iMiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIzMCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9nPjwvc3ZnPg==";

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
