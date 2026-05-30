"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, use } from "react";
import { MapPin, Calendar, Clock, Gift, QrCode, Copy, Check, ChevronDown, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { mockEvents, mockSchedule, mockGifts } from "@/mock/events";
import { formatDate, formatCurrency, getCountdown } from "@/lib/utils";
import { Gift as GiftType } from "@/types";

const FAKE_QR = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48ZyBmaWxsPSIjMTExODI3Ij48cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjQiLz48cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcng9IjIiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyIi8+PHJlY3QgeD0iMjUiIHk9IjI1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxyZWN0IHg9IjEzMCIgeT0iMTAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcng9IjQiLz48cmVjdCB4PSIxMzUiIHk9IjE1IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcng9IjIiLz48cmVjdCB4PSIxNDUiIHk9IjI1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPjxyZWN0IHg9IjE1MCIgeT0iMzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcng9IjIiLz48cmVjdCB4PSIxMCIgeT0iMTMwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSI0Ii8+PHJlY3QgeD0iMTUiIHk9IjEzNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIyMCIgeT0iMTQwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyIi8+PHJlY3QgeD0iMjUiIHk9IjE0NSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iMiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIzMCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHJ4PSIyIi8+PC9nPjwvc3ZnPg==";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(getCountdown(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Dias", value: countdown.days },
    { label: "Horas", value: countdown.hours },
    { label: "Minutos", value: countdown.minutes },
    { label: "Segundos", value: countdown.seconds },
  ];

  return (
    <div className="flex items-center gap-3 justify-center">
      {units.map((unit, i) => (
        <div key={unit.label}>
          <div className="flex items-center gap-3">
            <div className="bg-black/40 backdrop-blur rounded-2xl px-4 py-3 min-w-[60px] text-center">
              <motion.p
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white tabular-nums"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.p>
              <p className="text-white/60 text-xs mt-0.5">{unit.label}</p>
            </div>
            {i < units.length - 1 && (
              <span className="text-white/40 text-2xl font-light pb-4">:</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function EventContent({ id }: { id: string }) {
  const { success, error } = useToast();
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0];
  const schedule = mockSchedule.filter((s) => s.eventId === event.id).sort((a, b) => a.time.localeCompare(b.time));
  const gifts = mockGifts.filter((g) => g.eventId === event.id);

  const [rsvpModal, setRsvpModal] = useState(false);
  const [giftModal, setGiftModal] = useState<GiftType | null>(null);
  const [pixModal, setPixModal] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", status: "confirmado", companions: 0, message: "" });
  const [copiedPix, setCopiedPix] = useState(false);
  const [rsvpDone, setRsvpDone] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");

  const navLinks = [
    { id: "sobre", label: "Sobre o evento" },
    { id: "cronograma", label: "Cronograma" },
    { id: "presentes", label: "Presentes" },
    { id: "localizacao", label: "Localização" },
  ];

  const handleRSVP = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setRsvpDone(true);
    setTimeout(() => { setRsvpModal(false); setRsvpDone(false); }, 2000);
    success("Presença confirmada!", "Obrigado por confirmar sua presença.");
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(event.pixKey ?? "");
    setCopiedPix(true);
    success("PIX copiado!", "Chave PIX copiada para a área de transferência.");
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleChooseGift = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setGiftModal(null);
    success("Presente reservado!", "Seu presente foi reservado com sucesso.");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={event.banner}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur rounded-xl px-3 py-2">
            <Sparkles className="w-4 h-4 text-[#D4B996]" />
            <span className="text-white font-bold text-sm">evently+</span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-white/70 text-sm mb-2">{formatDate(event.date)}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">{event.name}</h1>
            <p className="text-white/70 mb-6 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />{event.time}
              <span className="text-white/30">·</span>
              <MapPin className="w-4 h-4" />{event.location}
            </p>
            <p className="text-white/60 text-sm mb-6">Faltam</p>
            <CountdownTimer targetDate={`${event.date}T${event.time}`} />
          </motion.div>
        </div>
      </div>

      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#EFE7DE] shadow-sm">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <nav className="flex gap-0 overflow-x-auto">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveSection(link.id);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                    activeSection === link.id
                      ? "border-[#111827] text-[#111827]"
                      : "border-transparent text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <Button
              size="sm"
              className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A] ml-4 whitespace-nowrap"
              onClick={() => setRsvpModal(true)}
            >
              Confirmar presença
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-12">
        <section id="sobre">
          <div className="bg-white border border-[#EFE7DE] rounded-2xl p-7">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D4B996]/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-[#B8966A]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#111827] mb-2">Sobre o evento</h2>
                <p className="text-[#6B7280] leading-relaxed">{event.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EFE7DE]">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#D4B996]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Data</p>
                  <p className="font-semibold text-[#111827] text-sm">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#D4B996]" />
                <div>
                  <p className="text-xs text-[#6B7280]">Horário</p>
                  <p className="font-semibold text-[#111827] text-sm">{event.time}</p>
                </div>
              </div>
            </div>
          </div>

          {event.organizerMessage && (
            <div className="mt-5 bg-[#EFE7DE]/60 border border-[#EFE7DE] rounded-2xl p-6 relative">
              <div className="text-5xl text-[#D4B996]/40 font-serif absolute top-4 left-6">"</div>
              <p className="text-[#111827] leading-relaxed relative z-10 mt-2 ml-4">{event.organizerMessage}</p>
              <p className="text-sm text-[#B8966A] font-medium mt-3 ml-4">— Organização do evento</p>
            </div>
          )}
        </section>

        <section id="cronograma" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-[#111827] mb-6">Cronograma</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#EFE7DE]" />
            <div className="space-y-1">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-16 pt-4 text-right">
                    <span className="text-sm font-bold text-[#D4B996]">{item.time}</span>
                  </div>
                  <div className="relative z-10 flex-shrink-0 mt-4">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#D4B996]" />
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="bg-white border border-[#EFE7DE] rounded-xl p-4 hover:shadow-sm transition-shadow">
                      <h4 className="font-semibold text-[#111827] mb-1">{item.title}</h4>
                      {item.description && (
                        <p className="text-sm text-[#6B7280]">{item.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="presentes" className="scroll-mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#111827]">Lista de Presentes</h2>
            <Badge variant="gold">{gifts.filter((g) => g.status === "disponivel").length} disponíveis</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {gifts.map((gift, i) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`bg-white border rounded-2xl overflow-hidden hover:shadow-md transition-all ${
                  gift.status === "escolhido" ? "border-[#A8C3B0]/50 opacity-70" : "border-[#EFE7DE]"
                }`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" />
                  {gift.status === "escolhido" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2">
                        <Check className="w-6 h-6 text-[#A8C3B0]" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-[#111827] text-sm">{gift.name}</h4>
                    <span className="text-sm font-bold text-[#111827] flex-shrink-0">{formatCurrency(gift.price)}</span>
                  </div>
                  {gift.description && <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{gift.description}</p>}
                  {gift.status === "disponivel" ? (
                    <Button
                      size="sm"
                      className="w-full bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]"
                      onClick={() => setGiftModal(gift)}
                      icon={<Gift className="w-3.5 h-3.5" />}
                    >
                      Vou presentear
                    </Button>
                  ) : (
                    <p className="text-xs text-[#A8C3B0] font-medium text-center py-2">✓ Já escolhido</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="localizacao" className="scroll-mt-16">
          <h2 className="text-2xl font-bold text-[#111827] mb-6">Localização</h2>
          <div className="bg-white border border-[#EFE7DE] rounded-2xl overflow-hidden">
            <div className="aspect-[16/7] bg-[#EFE7DE] relative flex items-center justify-center">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-46.6333,-23.5505,13,0/800x400?access_token=pk.placeholder')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#EFE7DE",
                }}
              >
                <div className="w-full h-full flex items-center justify-center flex-col gap-3 bg-[#EFE7DE]/80">
                  <div className="w-12 h-12 bg-[#D4B996] rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-white rounded-xl px-4 py-2 shadow-sm text-center">
                    <p className="font-semibold text-[#111827] text-sm">{event.location}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{event.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#111827]">{event.location}</p>
                <p className="text-sm text-[#6B7280] mt-0.5">{event.address}</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(event.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" icon={<MapPin className="w-4 h-4" />}>
                  Abrir no Maps
                </Button>
              </a>
            </div>
          </div>
        </section>

        {event.pixKey && (
          <section>
            <div className="bg-[#111827] rounded-2xl p-7 text-center">
              <QrCode className="w-10 h-10 text-[#D4B996] mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Contribuição via PIX</h2>
              <p className="text-white/60 text-sm mb-5">Sua contribuição é uma forma carinhosa de celebrar conosco.</p>
              <Button
                onClick={() => setPixModal(true)}
                className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]"
                icon={<QrCode className="w-4 h-4" />}
              >
                Ver QR Code PIX
              </Button>
            </div>
          </section>
        )}

        <div className="bg-gradient-to-r from-[#D4B996]/20 to-[#6C8EBF]/20 border border-[#EFE7DE] rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#111827] mb-2">Confirme sua presença</h3>
          <p className="text-[#6B7280] mb-5">Sua presença é muito importante para nós!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-[#111827] text-white hover:bg-[#1F2937]"
              onClick={() => { setRsvpForm((p) => ({ ...p, status: "confirmado" })); setRsvpModal(true); }}
            >
              Sim, irei! ✓
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { setRsvpForm((p) => ({ ...p, status: "recusado" })); setRsvpModal(true); }}
            >
              Não poderei ir
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => { setRsvpForm((p) => ({ ...p, status: "pendente" })); setRsvpModal(true); }}
            >
              Talvez
            </Button>
          </div>
        </div>

        <footer className="text-center py-4 border-t border-[#EFE7DE]">
          <p className="text-sm text-[#6B7280]">
            Feito com ❤️ usando{" "}
            <span className="font-bold text-[#111827]">evently+</span>
          </p>
        </footer>
      </div>

      <Modal open={rsvpModal} onClose={() => setRsvpModal(false)} title="Confirmar presença">
        {rsvpDone ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-bold text-[#111827] text-lg">Presença registrada!</h3>
            <p className="text-[#6B7280] text-sm mt-1">Obrigado por responder.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "confirmado", label: "Sim, irei! ✓" },
                { value: "recusado", label: "Não poderei ir" },
                { value: "pendente", label: "Talvez" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRsvpForm((p) => ({ ...p, status: opt.value }))}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                    rsvpForm.status === opt.value ? "border-[#111827] bg-[#111827] text-white" : "border-[#EFE7DE] text-[#6B7280]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <input
              placeholder="Seu nome completo *"
              value={rsvpForm.name}
              onChange={(e) => setRsvpForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]"
            />
            <input
              type="email"
              placeholder="Seu email *"
              value={rsvpForm.email}
              onChange={(e) => setRsvpForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]"
            />
            <input
              type="number"
              placeholder="Número de acompanhantes"
              min={0}
              max={10}
              value={rsvpForm.companions}
              onChange={(e) => setRsvpForm((p) => ({ ...p, companions: Number(e.target.value) }))}
              className="w-full border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]"
            />
            <textarea
              placeholder="Deixe uma mensagem carinhosa... (opcional)"
              value={rsvpForm.message}
              onChange={(e) => setRsvpForm((p) => ({ ...p, message: e.target.value }))}
              rows={3}
              className="w-full border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996] resize-none"
            />
            <Button className="w-full" onClick={handleRSVP} disabled={!rsvpForm.name || !rsvpForm.email}>
              Confirmar resposta
            </Button>
          </div>
        )}
      </Modal>

      <Modal open={!!giftModal} onClose={() => setGiftModal(null)} title="Reservar presente">
        {giftModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-[#EFE7DE] rounded-xl">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img src={giftModal.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-[#111827] text-sm">{giftModal.name}</p>
                <p className="text-sm text-[#D4B996] font-bold">{formatCurrency(giftModal.price)}</p>
              </div>
            </div>
            <input
              placeholder="Seu nome *"
              className="w-full border border-[#EFE7DE] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996]"
            />
            <Button className="w-full bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]" onClick={handleChooseGift}>
              <Gift className="w-4 h-4" />
              Confirmar presente
            </Button>
            {giftModal.link && (
              <a href={giftModal.link} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full">Ver produto →</Button>
              </a>
            )}
          </div>
        )}
      </Modal>

      <Modal open={pixModal} onClose={() => setPixModal(false)} title="Contribuição via PIX">
        <div className="text-center space-y-4">
          <div className="bg-[#FAF8F5] border border-[#EFE7DE] rounded-2xl p-4 inline-block">
            <img src={FAKE_QR} alt="QR Code" className="w-48 h-48 mx-auto" />
          </div>
          <div>
            <p className="text-sm text-[#6B7280] mb-1">Chave PIX</p>
            <div className="flex items-center gap-2 bg-[#FAF8F5] border border-[#EFE7DE] rounded-xl px-4 py-3">
              <p className="flex-1 text-sm font-medium text-[#111827] text-left truncate">{event.pixKey}</p>
              <button
                onClick={handleCopyPix}
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-all ${
                  copiedPix ? "text-green-600" : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedPix ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
          <p className="text-xs text-[#6B7280]">Beneficiário: <span className="font-semibold text-[#111827]">{event.pixName}</span></p>
        </div>
      </Modal>
    </div>
  );
}

export default function EventoPublicoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <ToastProvider>
      <EventContent id={id} />
    </ToastProvider>
  );
}
