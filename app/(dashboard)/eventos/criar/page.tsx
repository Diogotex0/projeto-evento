"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Clock, FileText, QrCode, Image as ImageIcon, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EVENT_TYPES } from "@/constants";
import { eventsService } from "@/services/api";
import { EventType } from "@/types";
import Link from "next/link";

const bannerOptions = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1544550385-768700304da5?w=800&q=80",
];

export default function CriarEventoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string; type: EventType | ""; date: string; time: string;
    location: string; address: string; description: string; banner: string;
    pixKey: string; pixName: string; organizerMessage: string;
  }>({
    name: "",
    type: "",
    date: "",
    time: "",
    location: "",
    address: "",
    description: "",
    banner: bannerOptions[0],
    pixKey: "",
    pixName: "",
    organizerMessage: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleCreate = async () => {
    setLoading(true);
    await eventsService.create({ ...form, type: form.type || "outro" });
    setLoading(false);
    router.push("/eventos");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/eventos">
          <button className="w-9 h-9 rounded-xl border border-[#EFE7DE] flex items-center justify-center hover:bg-[#EFE7DE] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Criar evento</h1>
          <p className="text-[#6B7280] text-sm">Passo {step} de 3</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
              s < step ? "bg-[#A8C3B0] text-white" : s === step ? "bg-[#111827] text-white" : "bg-[#EFE7DE] text-[#6B7280]"
            }`}>
              {s < step ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 w-16 ${s < step ? "bg-[#A8C3B0]" : "bg-[#EFE7DE]"}`} />}
          </div>
        ))}
        <div className="ml-2 text-sm text-[#6B7280]">
          {step === 1 ? "Informações básicas" : step === 2 ? "Localização & Banner" : "Extras"}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        {step === 1 && (
          <Card>
            <h2 className="font-semibold text-[#111827] mb-6 text-lg">Informações básicas</h2>
            <div className="space-y-5">
              <Input
                label="Nome do evento"
                placeholder="Ex: Casamento Ana & João"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />

              <div>
                <label className="text-sm font-medium text-[#111827] block mb-2">
                  Tipo de evento <span className="text-[#D4B996]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {EVENT_TYPES.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => update("type", type.value)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-sm transition-all ${
                        form.type === type.value
                          ? "border-[#111827] bg-[#111827] text-white"
                          : "border-[#EFE7DE] hover:border-[#D4B996] text-[#111827]"
                      }`}
                    >
                      <span className="text-xl">{type.emoji}</span>
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Data"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  leftIcon={<Calendar className="w-4 h-4" />}
                  required
                />
                <Input
                  label="Horário"
                  type="time"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  leftIcon={<Clock className="w-4 h-4" />}
                  required
                />
              </div>

              <Textarea
                label="Descrição"
                placeholder="Conte um pouco sobre o seu evento..."
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
          </Card>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Card>
              <h2 className="font-semibold text-[#111827] mb-6 text-lg">Localização</h2>
              <div className="space-y-4">
                <Input
                  label="Local do evento"
                  placeholder="Ex: Espaço Villa Jardins"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4" />}
                />
                <Input
                  label="Endereço completo"
                  placeholder="Rua, número, bairro, cidade - UF"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
            </Card>

            <Card>
              <h2 className="font-semibold text-[#111827] mb-4 text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#D4B996]" />
                Banner do evento
              </h2>
              <p className="text-sm text-[#6B7280] mb-4">Escolha um banner para seu evento</p>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {bannerOptions.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => update("banner", url)}
                    className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                      form.banner === url ? "border-[#111827] scale-95" : "border-transparent hover:border-[#D4B996]"
                    }`}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    {form.banner === url && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {form.banner && (
                <div className="rounded-xl overflow-hidden aspect-video">
                  <img src={form.banner} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <Card>
              <h2 className="font-semibold text-[#111827] mb-6 text-lg flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#6C8EBF]" />
                Configurar PIX
              </h2>
              <div className="space-y-4">
                <Input
                  label="Chave PIX"
                  placeholder="Email, CPF, telefone ou chave aleatória"
                  value={form.pixKey}
                  onChange={(e) => update("pixKey", e.target.value)}
                  hint="Os convidados poderão contribuir diretamente via PIX"
                />
                <Input
                  label="Nome do recebedor"
                  placeholder="Nome exibido no PIX"
                  value={form.pixName}
                  onChange={(e) => update("pixName", e.target.value)}
                />
              </div>
            </Card>

            <Card>
              <h2 className="font-semibold text-[#111827] mb-6 text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#A8C3B0]" />
                Mensagem do organizador
              </h2>
              <Textarea
                label="Mensagem para os convidados"
                placeholder="Escreva uma mensagem especial para seus convidados..."
                value={form.organizerMessage}
                onChange={(e) => update("organizerMessage", e.target.value)}
                rows={5}
              />
            </Card>

            <Card className="bg-[#FAF8F5]">
              <h3 className="font-semibold text-[#111827] mb-4">Preview do evento</h3>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={form.banner} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{form.name || "Nome do evento"}</p>
                  <p className="text-sm text-[#6B7280]">{form.date ? new Date(form.date).toLocaleDateString("pt-BR") : "Data"} · {form.time || "Horário"}</p>
                  <p className="text-sm text-[#6B7280]">{form.location || "Local"}</p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </motion.div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => step > 1 ? setStep(step - 1) : router.push("/eventos")}
        >
          <ArrowLeft className="w-4 h-4" />
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={step === 1 && (!form.name || !form.type)}>
            Próximo passo →
          </Button>
        ) : (
          <Button loading={loading} onClick={handleCreate} className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]">
            <Check className="w-4 h-4" />
            Criar evento
          </Button>
        )}
      </div>
    </div>
  );
}
