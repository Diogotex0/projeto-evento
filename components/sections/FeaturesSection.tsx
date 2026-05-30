"use client";
import { motion } from "framer-motion";
import { FileText, CheckCircle, Gift, CreditCard, MapPin, Bell } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Convite Digital",
    description: "Crie um convite único e compartilhe com seus convidados de forma elegante e personalizada.",
    color: "bg-[#6C8EBF]/10",
    iconColor: "text-[#6C8EBF]",
  },
  {
    icon: CheckCircle,
    title: "Confirmação de Presença",
    description: "Acompanhe quem confirmou e ainda não respondeu em tempo real, com notificações automáticas.",
    color: "bg-[#A8C3B0]/15",
    iconColor: "text-[#A8C3B0]",
  },
  {
    icon: Gift,
    title: "Lista de Presentes",
    description: "Seus convidados escolhem presentes de forma prática, organizada e sem duplicatas.",
    color: "bg-[#D4B996]/15",
    iconColor: "text-[#B8966A]",
  },
  {
    icon: CreditCard,
    title: "Contribuições PIX",
    description: "Receba contribuições com QR Code PIX de forma rápida, segura e sem taxas extras.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: MapPin,
    title: "Localização",
    description: "Compartilhe o local do evento com mapa interativo para facilitar o trajeto dos convidados.",
    color: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Envie lembretes automáticos para convidados que ainda não responderam ao convite.",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="recursos" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#D4B996] mb-3 uppercase tracking-widest">Recursos</p>
          <h2 className="text-4xl font-bold text-[#111827] mb-4">
            Tudo que você precisa
            <br />
            para um evento perfeito
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto">
            Uma plataforma completa que cuida de todos os detalhes para você focar no que importa: celebrar.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white border border-[#EFE7DE] rounded-2xl p-6 group transition-shadow hover:shadow-md cursor-default"
              >
                <div className={`w-11 h-11 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
