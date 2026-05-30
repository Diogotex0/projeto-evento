"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ana Carolina", role: "Noiva", avatar: "AC", text: "O Evently transformou a organização do meu casamento. Tudo ficou muito mais simples e elegante! Os convidados adoraram o convite digital.", stars: 5 },
  { name: "Fernanda Lima", role: "Aniversariante", avatar: "FL", text: "Minha festa de 30 anos ficou incrível! A lista de presentes digital foi um sucesso. Todo mundo conseguiu presentear sem duplicar.", stars: 5 },
  { name: "Roberto Nunes", role: "Pai da formanda", avatar: "RN", text: "A formatura da minha filha foi perfeita graças ao Evently. Organizar tudo em um só lugar é demais. Recomendo para todos!", stars: 5 },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-[#EFE7DE]/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#D4B996] mb-3 uppercase tracking-widest">Depoimentos</p>
          <h2 className="text-4xl font-bold text-[#111827]">Quem já usou, aprovou</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-[#EFE7DE] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4B996] text-[#D4B996]" />
                ))}
              </div>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4B996]/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-[#B8966A]">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
