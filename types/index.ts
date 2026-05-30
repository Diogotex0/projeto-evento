export type EventType =
  | "casamento"
  | "aniversario"
  | "formatura"
  | "cha-de-bebe"
  | "festa"
  | "corporativo"
  | "outro";

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  banner: string;
  pixKey?: string;
  pixName?: string;
  organizerMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export type RSVPStatus = "confirmado" | "pendente" | "recusado";

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  status: RSVPStatus;
  companions: number;
  respondedAt?: string;
  message?: string;
}

export type GiftStatus = "disponivel" | "escolhido";
export type GiftType = "unico" | "multiplo";

export interface Gift {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  link?: string;
  status: GiftStatus;
  type: GiftType;
  chosenBy?: string;
  category: string;
}

export interface ScheduleItem {
  id: string;
  eventId: string;
  time: string;
  title: string;
  description?: string;
  duration?: number;
  icon?: string;
}

export interface DashboardStats {
  totalGuests: number;
  confirmed: number;
  pending: number;
  declined: number;
  giftsChosen: number;
  giftsTotal: number;
  pixTotal: number;
  pixEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "pro" | "premium";
}
