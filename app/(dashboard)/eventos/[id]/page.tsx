"use client";
import { motion } from "framer-motion";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, Trash2, Calendar, MapPin, Clock, QrCode, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockEvents } from "@/mock/events";
import { EVENT_TYPES } from "@/constants";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default function EditarEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0];
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ ...event });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    router.push("/eventos");
  };

  const typeLabel = EVENT_TYPES.find((t) => t.value === event.type);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Link href="/eventos">
            <button className="w-9 h-9 rounded-xl border border-[#EFE7DE] flex items-center justify-center hover:bg-[#EFE7DE] transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#111827]">{event.name}</h1>
              {typeLabel && <Badge variant="gold">{typeLabel.emoji} {typeLabel.label}</Badge>}
            </div>
            <p className="text-[#6B7280] text-sm">Editando evento · {formatDate(event.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/evento/${event.id}`} target="_blank">
            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
              Visualizar
            </Button>
          </Link>
          <Button
            loading={saving}
            onClick={handleSave}
            size="sm"
            icon={<Save className="w-4 h-4" />}
            className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]"
          >
            Salvar
          </Button>
        </div>
      </div>

      <div className="relative aspect-[16/5] rounded-2xl overflow-hidden mb-6">
        <img src={form.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <h2 className="text-white text-2xl font-bold">{form.name}</h2>
            <p className="text-white/70 text-sm mt-1">{form.date} · {form.time}</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Card>
          <CardTitle className="mb-5 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4B996]" />
            Informações básicas
          </CardTitle>
          <div className="space-y-4">
            <Input
              label="Nome do evento"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
              <Input
                label="Horário"
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                leftIcon={<Clock className="w-4 h-4" />}
              />
            </div>
            <Textarea
              label="Descrição"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
            />
          </div>
        </Card>

        <Card>
          <CardTitle className="mb-5 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#6C8EBF]" />
            Localização
          </CardTitle>
          <div className="space-y-4">
            <Input
              label="Local do evento"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
            />
            <Input
              label="Endereço completo"
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
        </Card>

        {event.pixKey && (
          <Card>
            <CardTitle className="mb-5 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#A8C3B0]" />
              PIX
            </CardTitle>
            <div className="space-y-4">
              <Input
                label="Chave PIX"
                value={form.pixKey ?? ""}
                onChange={(e) => update("pixKey", e.target.value)}
              />
              <Input
                label="Nome do recebedor"
                value={form.pixName ?? ""}
                onChange={(e) => update("pixName", e.target.value)}
              />
            </div>
          </Card>
        )}

        <Card>
          <CardTitle className="mb-5">Mensagem do organizador</CardTitle>
          <Textarea
            value={form.organizerMessage ?? ""}
            onChange={(e) => update("organizerMessage", e.target.value)}
            rows={5}
            placeholder="Escreva uma mensagem para seus convidados..."
          />
        </Card>

        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors">
            <Trash2 className="w-4 h-4" />
            Excluir evento
          </button>
          <Button
            loading={saving}
            onClick={handleSave}
            icon={<Save className="w-4 h-4" />}
            className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]"
          >
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
