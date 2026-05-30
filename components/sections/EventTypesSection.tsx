"use client";
import { motion } from "framer-motion";

const types = [
  { emoji: "💍", label: "Casamentos", description: "Celebre o amor", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
  { emoji: "🎂", label: "Aniversários", description: "Momentos únicos", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80" },
  { emoji: "🎓", label: "Formaturas", description: "Novas conquistas", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80" },
  { emoji: "🎉", label: "Festas", description: "Diversão garantida", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80" },
  { emoji: "👶", label: "Chá de Bebê", description: "Chegada especial", image: "https://images.unsplash.com/photo-1544550385-768700304da5?w=400&q=80" },
  { emoji: "💼", label: "Corporativos", description: "Eventos profissionais", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80" },
];

export function EventTypesSection() {
  return (
    <section id="templates" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#D4B996] mb-3 uppercase tracking-widest">Templates</p>
          <h2 className="text-4xl font-bold text-[#111827] mb-4">
            Ideal para todos os
            <br />
            tipos de eventos
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {types.map((type, i) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-3">
                <img
                  src={type.image}
                  alt={type.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-2xl">{type.emoji}</span>
                </div>
              </div>
              <p className="font-semibold text-[#111827] text-sm text-center">{type.label}</p>
              <p className="text-xs text-[#6B7280] text-center">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
