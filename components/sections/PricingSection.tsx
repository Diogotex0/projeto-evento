"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfeito para começar",
    features: ["1 evento ativo", "Até 50 convidados", "RSVP básico", "Página pública", "Suporte por email"],
    cta: "Começar grátis",
    href: "/cadastro",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "Para eventos especiais",
    features: ["5 eventos ativos", "Convidados ilimitados", "Lista de presentes", "Contribuição PIX", "Cronograma", "Analytics avançado", "Suporte prioritário"],
    cta: "Assinar Pro",
    href: "/cadastro",
    popular: true,
  },
  {
    name: "Premium",
    price: "99",
    description: "Experiência completa",
    features: ["Eventos ilimitados", "Convidados ilimitados", "Tudo do Pro", "Domínio personalizado", "QR Code personalizado", "Exportar convidados", "Suporte 24/7"],
    cta: "Assinar Premium",
    href: "/cadastro",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="precos" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#D4B996] mb-3 uppercase tracking-widest">Preços</p>
          <h2 className="text-4xl font-bold text-[#111827] mb-4">Planos para cada momento</h2>
          <p className="text-[#6B7280]">Sem surpresas, sem taxas ocultas. Cancele quando quiser.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 border ${
                plan.popular
                  ? "bg-[#111827] border-[#111827] shadow-2xl scale-105"
                  : "bg-white border-[#EFE7DE]"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#D4B996] text-[#111827] text-xs font-bold px-3 py-1 rounded-full">
                    Mais popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`font-semibold ${plan.popular ? "text-white" : "text-[#111827]"}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mt-2">
                  <span className={`text-xs ${plan.popular ? "text-white/50" : "text-[#6B7280]"}`}>R$</span>
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#111827]"}`}>{plan.price}</span>
                  <span className={`text-sm pb-1 ${plan.popular ? "text-white/50" : "text-[#6B7280]"}`}>/mês</span>
                </div>
                <p className={`text-sm mt-1 ${plan.popular ? "text-white/50" : "text-[#6B7280]"}`}>{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-[#D4B996]" : "text-[#A8C3B0]"}`} />
                    <span className={`text-sm ${plan.popular ? "text-white/80" : "text-[#6B7280]"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 rounded-xl font-medium text-sm transition-all ${
                  plan.popular
                    ? "bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]"
                    : "bg-[#FAF8F5] border border-[#EFE7DE] text-[#111827] hover:bg-[#EFE7DE]"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
