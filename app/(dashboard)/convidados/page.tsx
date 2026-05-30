"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Plus, Users, CheckCircle, Clock, XCircle, Mail, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { mockGuests } from "@/mock/events";
import { Guest } from "@/types";

type Filter = "todos" | "confirmado" | "pendente" | "recusado";

const statusBadge: Record<string, { variant: "success" | "warning" | "danger"; label: string }> = {
  confirmado: { variant: "success", label: "Confirmado" },
  pendente: { variant: "warning", label: "Pendente" },
  recusado: { variant: "danger", label: "Recusado" },
};

export default function ConvidadosPage() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [addModal, setAddModal] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", phone: "", companions: 0 });

  const stats = {
    todos: guests.length,
    confirmado: guests.filter((g) => g.status === "confirmado").length,
    pendente: guests.filter((g) => g.status === "pendente").length,
    recusado: guests.filter((g) => g.status === "recusado").length,
  };

  const filtered = guests.filter((g) => {
    const matchFilter = filter === "todos" || g.status === filter;
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const handleAdd = () => {
    if (!newGuest.name || !newGuest.email) return;
    const guest: Guest = {
      id: `g-${Date.now()}`,
      eventId: "evt-1",
      name: newGuest.name,
      email: newGuest.email,
      phone: newGuest.phone,
      status: "pendente",
      companions: newGuest.companions,
    };
    setGuests((prev) => [guest, ...prev]);
    setNewGuest({ name: "", email: "", phone: "", companions: 0 });
    setAddModal(false);
  };

  const handleDelete = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Convidados</h1>
          <p className="text-[#6B7280] text-sm mt-1">{guests.length} convidados no total</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setAddModal(true)}>
          Adicionar convidado
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {([
          { key: "todos", label: "Total", icon: Users, color: "text-[#6C8EBF]", bg: "bg-[#6C8EBF]/10" },
          { key: "confirmado", label: "Confirmados", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { key: "pendente", label: "Pendentes", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { key: "recusado", label: "Recusados", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
        ] as const).map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`bg-white border rounded-2xl p-4 text-left transition-all hover:shadow-sm ${
                filter === s.key ? "border-[#111827] shadow-sm" : "border-[#EFE7DE]"
              }`}
            >
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-[#111827]">{stats[s.key]}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{s.label}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-[#EFE7DE] rounded-2xl overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-[#EFE7DE]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Buscar convidado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#EFE7DE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]"
            />
          </div>
          <p className="text-sm text-[#6B7280] whitespace-nowrap">{filtered.length} resultados</p>
        </div>

        <div className="divide-y divide-[#FAF8F5]">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 text-[#EFE7DE] mx-auto mb-3" />
              <p className="font-medium text-[#111827]">Nenhum convidado encontrado</p>
              <p className="text-sm text-[#6B7280] mt-1">Tente ajustar os filtros ou adicione novos convidados.</p>
            </div>
          ) : (
            filtered.map((guest, i) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[#FAF8F5] transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-[#EFE7DE] flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#6B7280]">
                    {guest.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#111827] text-sm">{guest.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-[#6B7280] flex items-center gap-1">
                      <Mail className="w-3 h-3" />{guest.email}
                    </span>
                    {guest.phone && (
                      <span className="text-xs text-[#6B7280] flex items-center gap-1">
                        <Phone className="w-3 h-3" />{guest.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {guest.companions > 0 && (
                    <span className="text-xs text-[#6B7280]">+{guest.companions} acomp.</span>
                  )}
                  <Badge variant={statusBadge[guest.status].variant}>
                    {statusBadge[guest.status].label}
                  </Badge>
                  <button
                    onClick={() => handleDelete(guest.id)}
                    aria-label={`Remover convidado ${guest.name}`}
                    className="text-[#EFE7DE] group-hover:text-[#6B7280] hover:!text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Adicionar convidado">
        <div className="space-y-4">
          <Input
            label="Nome completo"
            placeholder="Nome do convidado"
            value={newGuest.name}
            onChange={(e) => setNewGuest((p) => ({ ...p, name: e.target.value }))}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            value={newGuest.email}
            onChange={(e) => setNewGuest((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            value={newGuest.phone}
            onChange={(e) => setNewGuest((p) => ({ ...p, phone: e.target.value }))}
          />
          <Input
            label="Acompanhantes"
            type="number"
            min={0}
            max={10}
            value={newGuest.companions}
            onChange={(e) => setNewGuest((p) => ({ ...p, companions: Number(e.target.value) }))}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setAddModal(false)}>Cancelar</Button>
            <Button className="flex-1" onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
