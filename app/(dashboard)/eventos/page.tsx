"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Calendar, MapPin, Users, Eye, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockEvents } from "@/mock/events";
import { formatDate } from "@/lib/utils";
import { EVENT_TYPES } from "@/constants";

const typeLabels: Record<string, { label: string; emoji: string }> = Object.fromEntries(
  EVENT_TYPES.map((t) => [t.value, { label: t.label, emoji: t.emoji }])
);

export default function EventosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Meus Eventos</h1>
          <p className="text-[#6B7280] text-sm mt-1">{mockEvents.length} eventos criados</p>
        </div>
        <Link href="/eventos/criar">
          <Button icon={<Plus className="w-4 h-4" />}>
            Criar evento
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {mockEvents.map((event, i) => {
          const typeInfo = typeLabels[event.type] ?? { label: event.type, emoji: "✨" };
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#EFE7DE] rounded-2xl overflow-hidden group hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={event.banner}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-xl">{typeInfo.emoji}</span>
                </div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <Link href={`/evento/${event.id}`} target="_blank">
                    <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-[#111827]" />
                    </button>
                  </Link>
                  <Link href={`/eventos/${event.id}`}>
                    <button className="w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                      <Edit className="w-3.5 h-3.5 text-[#111827]" />
                    </button>
                  </Link>
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge variant="gold" size="sm">{typeInfo.label}</Badge>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-[#111827] text-lg mb-3">{event.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Calendar className="w-4 h-4 text-[#D4B996]" />
                    {formatDate(event.date)} · {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <MapPin className="w-4 h-4 text-[#D4B996]" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Users className="w-4 h-4 text-[#D4B996]" />
                    178 convidados
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#EFE7DE] flex items-center gap-2">
                  <Link href={`/eventos/${event.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      Gerenciar
                    </Button>
                  </Link>
                  <Link href={`/evento/${event.id}`} target="_blank">
                    <Button size="sm" className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: mockEvents.length * 0.08 }}
        >
          <Link href="/eventos/criar">
            <div className="h-full min-h-[320px] border-2 border-dashed border-[#EFE7DE] rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-[#D4B996] hover:bg-[#D4B996]/5 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-[#EFE7DE] rounded-xl flex items-center justify-center group-hover:bg-[#D4B996]/20 transition-colors">
                <Plus className="w-6 h-6 text-[#6B7280] group-hover:text-[#B8966A] transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-medium text-[#111827]">Criar novo evento</p>
                <p className="text-sm text-[#6B7280]">Clique para começar</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
