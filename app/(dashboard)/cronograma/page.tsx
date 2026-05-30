"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Clock, Edit2, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { mockSchedule } from "@/mock/events";
import { ScheduleItem } from "@/types";

const timelineIcons: Array<[string, string]> = [
  ["Chegada", "🎉"],
  ["Cerimônia", "💍"],
  ["Fotos", "📸"],
  ["Jantar", "🍽️"],
  ["Festa", "🎊"],
  ["Bolo", "🎂"],
];

function getIcon(title: string): string {
  const match = timelineIcons.find(([key]) => title.includes(key));
  return match ? match[1] : "⏰";
}

export default function CronogramaPage() {
  const [items, setItems] = useState<ScheduleItem[]>(mockSchedule);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<ScheduleItem | null>(null);
  const [form, setForm] = useState({ time: "", title: "", description: "", duration: "" });

  const sorted = [...items].sort((a, b) => a.time.localeCompare(b.time));

  const openAdd = () => {
    setEditItem(null);
    setForm({ time: "", title: "", description: "", duration: "" });
    setModal(true);
  };

  const openEdit = (item: ScheduleItem) => {
    setEditItem(item);
    setForm({ time: item.time, title: item.title, description: item.description ?? "", duration: String(item.duration ?? "") });
    setModal(true);
  };

  const handleSave = () => {
    if (!form.time || !form.title) return;
    if (editItem) {
      setItems((prev) => prev.map((i) => i.id === editItem.id ? { ...i, ...form, duration: form.duration ? Number(form.duration) : undefined } : i));
    } else {
      const newItem: ScheduleItem = {
        id: `s-${Date.now()}`,
        eventId: "evt-1",
        time: form.time,
        title: form.title,
        description: form.description || undefined,
        duration: form.duration ? Number(form.duration) : undefined,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setModal(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Cronograma</h1>
          <p className="text-[#6B7280] text-sm mt-1">{items.length} atividades programadas</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={openAdd}>
          Adicionar atividade
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#EFE7DE] rounded-2xl">
          <Clock className="w-12 h-12 text-[#EFE7DE] mx-auto mb-3" />
          <p className="font-medium text-[#111827]">Nenhuma atividade ainda</p>
          <p className="text-sm text-[#6B7280] mt-1 mb-4">Adicione as atividades do seu evento</p>
          <Button onClick={openAdd} size="sm">Adicionar primeira atividade</Button>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-[4.5rem] top-0 bottom-0 w-px bg-[#EFE7DE]" />
          <div className="space-y-2">
            <AnimatePresence>
              {sorted.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex items-start gap-5 group"
                >
                  <div className="flex-shrink-0 w-16 pt-4 text-right">
                    <span className="text-sm font-bold text-[#111827]">{item.time}</span>
                  </div>

                  <div className="relative z-10 flex-shrink-0 mt-3.5">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#D4B996] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#D4B996]" />
                    </div>
                  </div>

                  <div className="flex-1 pb-4">
                    <div className="bg-white border border-[#EFE7DE] rounded-2xl p-4 hover:border-[#D4B996]/50 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl mt-0.5">{getIcon(item.title)}</span>
                          <div>
                            <h3 className="font-semibold text-[#111827]">{item.title}</h3>
                            {item.description && (
                              <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">{item.description}</p>
                            )}
                            {item.duration && (
                              <div className="flex items-center gap-1 mt-2">
                                <Clock className="w-3.5 h-3.5 text-[#D4B996]" />
                                <span className="text-xs text-[#6B7280]">{item.duration} minutos</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEdit(item)}
                            className="w-8 h-8 rounded-lg hover:bg-[#EFE7DE] flex items-center justify-center transition-colors text-[#6B7280]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors text-[#6B7280] hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editItem ? "Editar atividade" : "Nova atividade"}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Horário"
              type="time"
              value={form.time}
              onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              required
            />
            <Input
              label="Duração (min)"
              type="number"
              placeholder="60"
              value={form.duration}
              onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))}
            />
          </div>
          <Input
            label="Título da atividade"
            placeholder="Ex: Cerimônia"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
          <Textarea
            label="Descrição (opcional)"
            placeholder="Detalhes sobre esta atividade..."
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={3}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setModal(false)}>Cancelar</Button>
            <Button className="flex-1" onClick={handleSave}>
              <Check className="w-4 h-4" />
              {editItem ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
