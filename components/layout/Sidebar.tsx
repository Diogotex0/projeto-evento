"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, Users, Gift, Clock, QrCode,
  Sparkles, ChevronDown, Settings, LogOut, Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser, mockEvents } from "@/mock/events";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Meus Eventos", href: "/eventos", icon: Calendar },
  { label: "Convidados", href: "/convidados", icon: Users },
  { label: "Presentes", href: "/presentes", icon: Gift },
  { label: "Cronograma", href: "/cronograma", icon: Clock },
  { label: "PIX & Contribuições", href: "/pix", icon: QrCode },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [eventDropdown, setEventDropdown] = useState(false);
  const currentEvent = mockEvents[0];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#EFE7DE] flex flex-col">
      <div className="p-5 border-b border-[#EFE7DE]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#D4B996]" />
          </div>
          <span className="font-bold text-[#111827] tracking-tight">
            evently<span className="text-[#D4B996]">+</span>
          </span>
        </Link>
      </div>

      <div className="p-4">
        <button
          onClick={() => setEventDropdown(!eventDropdown)}
          aria-label="Selecionar evento ativo"
          aria-expanded={eventDropdown}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE7DE] hover:border-[#D4B996]/50 transition-all group"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#EFE7DE] flex-shrink-0">
            <img src={currentEvent.banner} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs text-[#6B7280]">Evento ativo</p>
            <p className="text-sm font-medium text-[#111827] truncate">{currentEvent.name}</p>
          </div>
          <ChevronDown className={cn("w-4 h-4 text-[#6B7280] transition-transform", eventDropdown && "rotate-180")} />
        </button>

        {eventDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-white border border-[#EFE7DE] rounded-xl overflow-hidden shadow-sm"
          >
            {mockEvents.map((event) => (
              <Link
                key={event.id}
                href={`/eventos/${event.id}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#FAF8F5] transition-colors"
                onClick={() => setEventDropdown(false)}
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden bg-[#EFE7DE] flex-shrink-0">
                  <img src={event.banner} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-[#111827] truncate">{event.name}</span>
              </Link>
            ))}
            <Link
              href="/eventos/criar"
              className="flex items-center gap-2 px-3 py-2.5 text-[#D4B996] hover:bg-[#FAF8F5] border-t border-[#EFE7DE] transition-colors"
              onClick={() => setEventDropdown(false)}
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Criar evento</span>
            </Link>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all",
                active
                  ? "bg-[#111827] text-white font-medium"
                  : "text-[#6B7280] hover:bg-[#FAF8F5] hover:text-[#111827]"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#EFE7DE]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EFE7DE] overflow-hidden flex-shrink-0">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${mockUser.name}&backgroundColor=D4B996`}
              alt={mockUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#111827] truncate">{mockUser.name}</p>
            <p className="text-xs text-[#6B7280] truncate">{mockUser.plan} plan</p>
          </div>
          <Link href="/login" className="text-[#6B7280] hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
