"use client";
import { motion } from "framer-motion";
import { Sparkles, Settings, Share2, PartyPopper } from "lucide-react";

const steps = [
  { number: "01", icon: Sparkles, title: "Crie seu evento", description: "Escolha o tipo de evento, adicione as informações essenciais e personalize com seu estilo único." },
  { number: "02", icon: Settings, title: "Configure tudo", description: "Adicione lista de presentes, cronograma, PIX e personalize a página do evento para impressionar." },
  { number: "03", icon: Share2, title: "Compartilhe o link", description: "Envie o link do convite digital para seus convidados via WhatsApp, Instagram ou email." },
  { number: "04", icon: PartyPopper, title: "Celebre!", description: "Acompanhe as confirmações em tempo real e celebre com quem você ama." },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24 px-4 bg-[#111827] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4B996]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6C8EBF]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#D4B996] mb-3 uppercase tracking-widest">Como funciona</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Simples assim
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Em poucos minutos você tem um evento profissional pronto para compartilhar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
                )}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-white/10">{step.number}</span>
                    <div className="w-10 h-10 bg-[#D4B996]/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#D4B996]" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
