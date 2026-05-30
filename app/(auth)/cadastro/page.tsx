"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const benefits = [
  "1 evento grátis para sempre",
  "Até 50 convidados no plano free",
  "Página pública do evento",
  "RSVP e confirmação de presença",
];

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      <div className="hidden lg:flex w-1/2 bg-[#EFE7DE]/60 flex-col items-center justify-center px-16">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4B996]" />
            </div>
            <span className="font-bold text-[#111827] text-xl">
              evently<span className="text-[#D4B996]">+</span>
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-[#111827] mb-4 leading-tight">
            Comece a criar
            <br />
            seu evento hoje
          </h2>
          <p className="text-[#6B7280] mb-8 leading-relaxed">
            Junte-se a mais de 2.500 organizadores que já confiam no Evently.
          </p>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#A8C3B0]/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#A8C3B0]" />
                </div>
                <span className="text-sm text-[#111827]">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white border border-[#EFE7DE] rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#D4B996]/20 flex items-center justify-center">
                <span className="text-sm font-bold text-[#B8966A]">AC</span>
              </div>
              <div>
                <p className="font-semibold text-[#111827] text-sm">Ana Carolina</p>
                <p className="text-xs text-[#6B7280]">Noiva ❤️</p>
              </div>
            </div>
            <p className="text-sm text-[#6B7280] italic">
              "O Evently foi essencial para o meu casamento. Simples, bonito e funcional. Todos os convidados amaram!"
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4B996]" />
              </div>
              <span className="font-bold text-[#111827] text-xl">
                evently<span className="text-[#D4B996]">+</span>
              </span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#111827] mb-2">Criar conta grátis</h1>
            <p className="text-[#6B7280]">Sem cartão de crédito. Sem compromisso.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
              hint="Use letras, números e símbolos para uma senha forte."
            />

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 rounded accent-[#111827]" />
              <span className="text-sm text-[#6B7280]">
                Concordo com os{" "}
                <Link href="#" className="text-[#111827] underline underline-offset-2">Termos de Uso</Link>{" "}
                e{" "}
                <Link href="#" className="text-[#111827] underline underline-offset-2">Política de Privacidade</Link>.
              </span>
            </label>

            <Button type="submit" loading={loading} size="lg" className="w-full">
              Criar conta grátis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="font-semibold text-[#111827] hover:text-[#D4B996] transition-colors">
              Fazer login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
