import { Event, Guest, Gift, ScheduleItem, DashboardStats } from "@/types";
import {
  mockEvents,
  mockGuests,
  mockGifts,
  mockSchedule,
  mockDashboardStats,
} from "@/mock/events";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Ready for REST API integration — replace mock returns with fetch() calls

export const eventsService = {
  list: async (): Promise<Event[]> => {
    await delay(600);
    return mockEvents;
  },
  getById: async (id: string): Promise<Event | null> => {
    await delay(400);
    return mockEvents.find((e) => e.id === id) ?? null;
  },
  create: async (data: Partial<Event>): Promise<Event> => {
    await delay(800);
    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      name: data.name ?? "",
      type: data.type ?? "outro",
      date: data.date ?? "",
      time: data.time ?? "",
      location: data.location ?? "",
      address: data.address ?? "",
      description: data.description ?? "",
      banner: data.banner ?? "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
      pixKey: data.pixKey,
      pixName: data.pixName,
      organizerMessage: data.organizerMessage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newEvent;
  },
  update: async (id: string, data: Partial<Event>): Promise<Event> => {
    await delay(600);
    const existing = mockEvents.find((e) => e.id === id)!;
    return { ...existing, ...data, updatedAt: new Date().toISOString() };
  },
  delete: async (id: string): Promise<void> => {
    await delay(500);
  },
};

export const guestsService = {
  listByEvent: async (eventId: string): Promise<Guest[]> => {
    await delay(500);
    return mockGuests.filter((g) => g.eventId === eventId);
  },
  create: async (data: Partial<Guest>): Promise<Guest> => {
    await delay(600);
    return { id: `g-${Date.now()}`, eventId: data.eventId ?? "", name: data.name ?? "", email: data.email ?? "", status: "pendente", companions: data.companions ?? 0 };
  },
  updateStatus: async (id: string, status: Guest["status"]): Promise<Guest> => {
    await delay(400);
    const guest = mockGuests.find((g) => g.id === id)!;
    return { ...guest, status, respondedAt: new Date().toISOString() };
  },
  delete: async (id: string): Promise<void> => {
    await delay(400);
  },
};

export const giftsService = {
  listByEvent: async (eventId: string): Promise<Gift[]> => {
    await delay(500);
    return mockGifts.filter((g) => g.eventId === eventId);
  },
  create: async (data: Partial<Gift>): Promise<Gift> => {
    await delay(600);
    return {
      id: `gift-${Date.now()}`,
      eventId: data.eventId ?? "",
      name: data.name ?? "",
      price: data.price ?? 0,
      image: data.image ?? "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80",
      status: "disponivel",
      type: data.type ?? "unico",
      category: data.category ?? "Geral",
    };
  },
  choose: async (id: string, guestName: string): Promise<Gift> => {
    await delay(500);
    const gift = mockGifts.find((g) => g.id === id)!;
    return { ...gift, status: "escolhido", chosenBy: guestName };
  },
};

export const scheduleService = {
  listByEvent: async (eventId: string): Promise<ScheduleItem[]> => {
    await delay(400);
    return mockSchedule.filter((s) => s.eventId === eventId).sort((a, b) => a.time.localeCompare(b.time));
  },
  create: async (data: Partial<ScheduleItem>): Promise<ScheduleItem> => {
    await delay(500);
    return { id: `s-${Date.now()}`, eventId: data.eventId ?? "", time: data.time ?? "", title: data.title ?? "", description: data.description };
  },
  update: async (id: string, data: Partial<ScheduleItem>): Promise<ScheduleItem> => {
    await delay(400);
    const item = mockSchedule.find((s) => s.id === id)!;
    return { ...item, ...data };
  },
  delete: async (id: string): Promise<void> => {
    await delay(400);
  },
};

export const dashboardService = {
  getStats: async (eventId?: string): Promise<DashboardStats> => {
    await delay(700);
    return mockDashboardStats;
  },
};
