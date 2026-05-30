"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockPhoneCards = [
  { label: "Convite Digital", icon: "✉️", color: "bg-[#6C8EBF]/10 border-[#6C8EBF]/20" },
  { label: "Presença (RSVP)", icon: "✅", color: "bg-[#A8C3B0]/10 border-[#A8C3B0]/20" },
  { label: "Lista de Presentes", icon: "🎁", color: "bg-[#D4B996]/10 border-[#D4B996]/20" },
  { label: "PIX & Contribuições", icon: "💳", color: "bg-purple-100 border-purple-200" },
  { label: "Cronograma", icon: "📅", color: "bg-rose-50 border-rose-200" },
  { label: "Mapa & Localização", icon: "📍", color: "bg-amber-50 border-amber-200" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#D4B996]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#6C8EBF]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A8C3B0]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4B996]/15 border border-[#D4B996]/30 rounded-full mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8966A]" />
              <span className="text-xs font-medium text-[#B8966A]">Organize eventos memoráveis com tecnologia</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-5xl lg:text-6xl font-bold text-[#111827] leading-tight tracking-tight mb-6"
            >
              Sua plataforma
              <br />
              completa para
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4B996] to-[#6C8EBF]">
                eventos incríveis
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-[#6B7280] leading-relaxed mb-8 max-w-lg"
            >
              Convites digitais, confirmação de presença, lista de presentes, contribuições via PIX e muito mais.
              Tudo em um só lugar, de forma simples e inteligente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/cadastro">
                <Button size="lg" className="bg-[#111827] text-white hover:bg-[#1F2937] gap-2">
                  Criar meu evento
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 border-[#EFE7DE]">
                <Play className="w-4 h-4" />
                Ver demonstração
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-[#EFE7DE] overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 13}&backgroundColor=D4B996`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4B996] text-[#D4B996]" />
                  ))}
                </div>
                <p className="text-xs text-[#6B7280]">
                  <span className="font-semibold text-[#111827]">+2.500</span> eventos criados com amor
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-72">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#D4B996]/20 rounded-full blur-2xl" />
              <div className="relative bg-white border border-[#EFE7DE] rounded-[2.5rem] p-4 shadow-2xl overflow-hidden"
                style={{ boxShadow: "0 32px 64px rgba(17,24,39,0.12), 0 0 0 1px rgba(239,231,222,0.8)" }}>
                <div className="bg-[#111827] rounded-2xl p-4 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-[#111827]" />
                  <div className="relative">
                    <p className="text-[#D4B996] text-xs font-medium mb-1">Casamento</p>
                    <h3 className="text-white font-bold text-lg leading-tight">Ana & João</h3>
                    <p className="text-white/50 text-xs mt-1">24 de Mai, 2025 · 19:00</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 bg-white/10 rounded-xl p-3">
                      <p className="text-white/50 text-xs">Confirmados</p>
                      <p className="text-white font-bold text-xl">128</p>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-xl p-3">
                      <p className="text-white/50 text-xs">Pendentes</p>
                      <p className="text-white font-bold text-xl">38</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-medium text-[#6B7280] mb-3">Meus Eventos</p>
                <div className="grid grid-cols-2 gap-2">
                  {mockPhoneCards.map((card) => (
                    <motion.div
                      key={card.label}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border ${card.color}`}
                    >
                      <span className="text-base">{card.icon}</span>
                      <span className="text-xs font-medium text-[#111827] leading-tight">{card.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-16 top-16 bg-white border border-[#EFE7DE] rounded-2xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">✅</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">Carlos confirmou!</p>
                    <p className="text-xs text-[#6B7280]">+1 acompanhante</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-16 bottom-20 bg-white border border-[#EFE7DE] rounded-2xl p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#D4B996]/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">💳</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">PIX recebido</p>
                    <p className="text-xs text-[#D4B996] font-medium">R$ 200,00</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
