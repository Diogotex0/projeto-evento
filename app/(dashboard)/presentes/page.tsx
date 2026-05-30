"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, ExternalLink, Gift, CheckCircle, Repeat, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { mockGifts } from "@/mock/events";
import { formatCurrency } from "@/lib/utils";
import { Gift as GiftType } from "@/types";

export default function PresentesPage() {
  const [gifts, setGifts] = useState<GiftType[]>(mockGifts);
  const [filter, setFilter] = useState<"todos" | "disponivel" | "escolhido">("todos");
  const [addModal, setAddModal] = useState(false);
  const [newGift, setNewGift] = useState({ name: "", price: "", description: "", link: "", category: "", type: "unico" as "unico" | "multiplo" });

  const filtered = gifts.filter((g) => filter === "todos" || g.status === filter);
  const chosen = gifts.filter((g) => g.status === "escolhido").length;

  const handleAdd = () => {
    if (!newGift.name || !newGift.price) return;
    const gift: GiftType = {
      id: `gift-${Date.now()}`,
      eventId: "evt-1",
      name: newGift.name,
      price: parseFloat(newGift.price),
      description: newGift.description,
      link: newGift.link,
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&q=80",
      status: "disponivel",
      type: newGift.type,
      category: newGift.category || "Geral",
    };
    setGifts((prev) => [gift, ...prev]);
    setNewGift({ name: "", price: "", description: "", link: "", category: "", type: "unico" });
    setAddModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Lista de Presentes</h1>
          <p className="text-[#6B7280] text-sm mt-1">{chosen} de {gifts.length} presentes escolhidos</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setAddModal(true)}>
          Adicionar presente
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {(["todos", "disponivel", "escolhido"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f ? "bg-[#111827] text-white" : "bg-white border border-[#EFE7DE] text-[#6B7280] hover:border-[#D4B996]"
            }`}
          >
            {f === "todos" ? "Todos" : f === "disponivel" ? "Disponíveis" : "Escolhidos"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((gift, i) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`bg-white border rounded-2xl overflow-hidden group transition-all hover:shadow-md ${
              gift.status === "escolhido" ? "border-[#A8C3B0]" : "border-[#EFE7DE]"
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={gift.image}
                alt={gift.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {gift.status === "escolhido" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3">
                    <CheckCircle className="w-8 h-8 text-[#A8C3B0]" />
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3">
                <Badge variant={gift.status === "escolhido" ? "success" : "default"} size="sm">
                  {gift.status === "escolhido" ? "Escolhido" : "Disponível"}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                {gift.type === "multiplo" ? (
                  <div className="bg-[#6C8EBF]/20 border border-[#6C8EBF]/30 rounded-lg px-2 py-1 flex items-center gap-1">
                    <Repeat className="w-3 h-3 text-[#6C8EBF]" />
                    <span className="text-xs text-[#6C8EBF] font-medium">Múltiplo</span>
                  </div>
                ) : (
                  <div className="bg-[#D4B996]/20 border border-[#D4B996]/30 rounded-lg px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#B8966A]" />
                    <span className="text-xs text-[#B8966A] font-medium">Único</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-[#111827] text-sm leading-tight">{gift.name}</h3>
                <span className="text-sm font-bold text-[#111827] flex-shrink-0">{formatCurrency(gift.price)}</span>
              </div>
              {gift.description && (
                <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{gift.description}</p>
              )}
              {gift.status === "escolhido" && gift.chosenBy && (
                <p className="text-xs text-[#A8C3B0] font-medium mb-3">Escolhido por {gift.chosenBy}</p>
              )}
              <div className="flex items-center gap-2">
                {gift.link && (
                  <a
                    href={gift.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-[#6C8EBF] hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ver produto
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setAddModal(true)}
          className="border-2 border-dashed border-[#EFE7DE] rounded-2xl flex flex-col items-center justify-center gap-3 min-h-[280px] hover:border-[#D4B996] hover:bg-[#D4B996]/5 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 bg-[#EFE7DE] rounded-xl flex items-center justify-center group-hover:bg-[#D4B996]/20 transition-colors">
            <Gift className="w-6 h-6 text-[#6B7280] group-hover:text-[#B8966A]" />
          </div>
          <div className="text-center">
            <p className="font-medium text-[#111827]">Adicionar presente</p>
            <p className="text-sm text-[#6B7280]">Clique para adicionar</p>
          </div>
        </motion.div>
      </div>

      <Modal open={addModal} onClose={() => setAddModal(false)} title="Adicionar presente">
        <div className="space-y-4">
          <Input
            label="Nome do presente"
            placeholder="Ex: Jogo de Panelas Le Creuset"
            value={newGift.name}
            onChange={(e) => setNewGift((p) => ({ ...p, name: e.target.value }))}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Preço (R$)"
              type="number"
              placeholder="0,00"
              value={newGift.price}
              onChange={(e) => setNewGift((p) => ({ ...p, price: e.target.value }))}
            />
            <Input
              label="Categoria"
              placeholder="Cozinha, Decoração..."
              value={newGift.category}
              onChange={(e) => setNewGift((p) => ({ ...p, category: e.target.value }))}
            />
          </div>
          <Textarea
            label="Descrição"
            placeholder="Descrição do presente..."
            value={newGift.description}
            onChange={(e) => setNewGift((p) => ({ ...p, description: e.target.value }))}
            rows={2}
          />
          <Input
            label="Link do produto"
            type="url"
            placeholder="https://..."
            value={newGift.link}
            onChange={(e) => setNewGift((p) => ({ ...p, link: e.target.value }))}
          />
          <div>
            <label className="text-sm font-medium text-[#111827] block mb-2">Tipo</label>
            <div className="grid grid-cols-2 gap-2">
              {(["unico", "multiplo"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewGift((p) => ({ ...p, type: t }))}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    newGift.type === t ? "border-[#111827] bg-[#111827] text-white" : "border-[#EFE7DE] text-[#6B7280] hover:border-[#D4B996]"
                  }`}
                >
                  {t === "unico" ? "Único" : "Múltiplo"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setAddModal(false)}>Cancelar</Button>
            <Button className="flex-1" onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
