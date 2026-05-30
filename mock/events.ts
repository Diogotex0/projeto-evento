import { Event, Guest, Gift, ScheduleItem, DashboardStats, User } from "@/types";

export const mockUser: User = {
  id: "user-1",
  name: "Diogo Silva",
  email: "diogo@email.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=diogo",
  plan: "pro",
};

export const mockEvents: Event[] = [
  {
    id: "evt-1",
    name: "Casamento Ana & João",
    type: "casamento",
    date: "2025-09-20",
    time: "19:00",
    location: "Espaço Villa Jardins",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    description:
      "Uma celebração de amor e união entre Ana e João. Venha compartilhar este momento especial conosco, rodeados de flores, música e muita alegria.",
    banner:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    pixKey: "casamento.ana.joao@pix.com",
    pixName: "Ana & João",
    organizerMessage:
      "Estamos muito felizes em compartilhar esse momento tão especial com vocês. Sua presença é o maior presente que podemos receber. Com muito amor, Ana & João ❤️",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "evt-2",
    name: "Aniversário Maria Luiza",
    type: "aniversario",
    date: "2025-06-15",
    time: "19:00",
    location: "Espaço Happy Day",
    address: "Rua das Flores, 250 - Jardins, São Paulo - SP",
    description:
      "15 anos de muita alegria e conquistas! Venha celebrar comigo essa data tão especial.",
    banner:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    pixKey: "maria.luiza@pix.com",
    pixName: "Maria Luiza",
    organizerMessage:
      "Meus 15 anos são muito mais especiais com a sua presença! Te espero para comemorar junto comigo! 🎉",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-03-15T11:00:00Z",
  },
  {
    id: "evt-3",
    name: "Formatura Lucas",
    type: "formatura",
    date: "2025-06-30",
    time: "20:00",
    location: "Centro de Convenções",
    address: "Av. Brigadeiro Faria Lima, 3000 - Itaim Bibi, São Paulo - SP",
    description:
      "Depois de 5 anos de muito esforço e dedicação, chegou a hora de celebrar!",
    banner:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    createdAt: "2024-03-01T08:00:00Z",
    updatedAt: "2024-03-25T16:00:00Z",
  },
];

export const mockGuests: Guest[] = [
  { id: "g-1", eventId: "evt-1", name: "Carlos Mendes", email: "carlos@email.com", phone: "(11) 99999-0001", status: "confirmado", companions: 1, respondedAt: "2024-03-10T10:00:00Z" },
  { id: "g-2", eventId: "evt-1", name: "Fernanda Costa", email: "fernanda@email.com", phone: "(11) 99999-0002", status: "confirmado", companions: 0, respondedAt: "2024-03-11T14:00:00Z" },
  { id: "g-3", eventId: "evt-1", name: "Ricardo Alves", email: "ricardo@email.com", phone: "(11) 99999-0003", status: "confirmado", companions: 2, respondedAt: "2024-03-12T09:00:00Z" },
  { id: "g-4", eventId: "evt-1", name: "Patrícia Lima", email: "patricia@email.com", phone: "(11) 99999-0004", status: "confirmado", companions: 1, respondedAt: "2024-03-13T11:00:00Z" },
  { id: "g-5", eventId: "evt-1", name: "Marcos Souza", email: "marcos@email.com", phone: "(11) 99999-0005", status: "confirmado", companions: 0, respondedAt: "2024-03-14T15:00:00Z" },
  { id: "g-6", eventId: "evt-1", name: "Juliana Ferreira", email: "juliana@email.com", phone: "(11) 99999-0006", status: "pendente", companions: 0 },
  { id: "g-7", eventId: "evt-1", name: "André Santos", email: "andre@email.com", phone: "(11) 99999-0007", status: "pendente", companions: 1 },
  { id: "g-8", eventId: "evt-1", name: "Camila Rodrigues", email: "camila@email.com", phone: "(11) 99999-0008", status: "pendente", companions: 0 },
  { id: "g-9", eventId: "evt-1", name: "Rafael Oliveira", email: "rafael@email.com", phone: "(11) 99999-0009", status: "recusado", companions: 0, respondedAt: "2024-03-08T16:00:00Z", message: "Infelizmente não poderei comparecer, mas desejo muita felicidade a vocês!" },
  { id: "g-10", eventId: "evt-1", name: "Beatriz Nunes", email: "beatriz@email.com", phone: "(11) 99999-0010", status: "recusado", companions: 0, respondedAt: "2024-03-09T10:00:00Z" },
];

export const mockGifts: Gift[] = [
  { id: "gift-1", eventId: "evt-1", name: "Jogo de Panelas Le Creuset", description: "Conjunto premium de 5 panelas em ferro fundido esmaltado", price: 1200, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80", link: "https://example.com/panelas", status: "escolhido", type: "unico", chosenBy: "Carlos Mendes", category: "Cozinha" },
  { id: "gift-2", eventId: "evt-1", name: "Jogo de Cama King Trussardi", description: "Cama completa 400 fios egípcio, cor champagne", price: 890, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80", link: "https://example.com/cama", status: "disponivel", type: "unico", category: "Quarto" },
  { id: "gift-3", eventId: "evt-1", name: "Viagem de Lua de Mel", description: "Contribuição para a lua de mel dos noivos em Maldivas", price: 500, image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80", status: "disponivel", type: "multiplo", category: "Experiências" },
  { id: "gift-4", eventId: "evt-1", name: "Air Fryer Philips XXL", description: "Fritadeira elétrica 7,3L com tecnologia Rapid Air", price: 650, image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80", link: "https://example.com/airfryer", status: "disponivel", type: "unico", category: "Eletrodomésticos" },
  { id: "gift-5", eventId: "evt-1", name: "Louça Tramontina Porcelana", description: "Aparelho 42 peças para 12 pessoas", price: 480, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80", status: "escolhido", type: "unico", chosenBy: "Fernanda Costa", category: "Cozinha" },
  { id: "gift-6", eventId: "evt-1", name: "Espelho Decorativo", description: "Espelho veneziano redondo 80cm", price: 320, image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80", status: "disponivel", type: "unico", category: "Decoração" },
];

export const mockSchedule: ScheduleItem[] = [
  { id: "s-1", eventId: "evt-1", time: "17:00", title: "Chegada dos Convidados", description: "Recepção com coquetel de boas vindas e música ao vivo", duration: 60 },
  { id: "s-2", eventId: "evt-1", time: "18:00", title: "Cerimônia", description: "Cerimônia de casamento na chapel garden", duration: 60 },
  { id: "s-3", eventId: "evt-1", time: "19:00", title: "Sessão de Fotos", description: "Fotos oficiais com os noivos e família", duration: 60 },
  { id: "s-4", eventId: "evt-1", time: "20:00", title: "Jantar", description: "Jantar completo com cardápio especial dos noivos", duration: 90 },
  { id: "s-5", eventId: "evt-1", time: "21:30", title: "Festa e Dança", description: "Abertura da pista de dança e show ao vivo", duration: 180 },
  { id: "s-6", eventId: "evt-1", time: "00:00", title: "Corte do Bolo", description: "Momento especial com o tradicional corte do bolo", duration: 30 },
];

export const mockDashboardStats: DashboardStats = {
  totalGuests: 178,
  confirmed: 128,
  pending: 38,
  declined: 12,
  giftsChosen: 23,
  giftsTotal: 45,
  pixTotal: 3450,
  pixEnabled: true,
};

export const mockChartData = [
  { date: "20/04", confirmados: 12, pendentes: 80, recusados: 2 },
  { date: "27/04", confirmados: 35, pendentes: 75, recusados: 4 },
  { date: "04/05", confirmados: 58, pendentes: 60, recusados: 7 },
  { date: "11/05", confirmados: 95, pendentes: 45, recusados: 9 },
  { date: "18/05", confirmados: 128, pendentes: 38, recusados: 12 },
];
