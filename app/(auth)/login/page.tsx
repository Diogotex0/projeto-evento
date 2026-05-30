"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      <div className="hidden lg:flex w-1/2 bg-[#111827] relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#111827]/90 to-[#1F2937]" />
        </div>
        <div className="relative text-center px-12">
          <Link href="/" className="flex items-center gap-2 justify-center mb-12">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4B996]" />
            </div>
            <span className="text-2xl font-bold text-white">
              evently<span className="text-[#D4B996]">+</span>
            </span>
          </Link>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Organize eventos
            <br />
            <span className="text-[#D4B996]">inesquecíveis</span>
          </h2>
          <p className="text-white/50 leading-relaxed">
            Convites digitais, lista de presentes, confirmações de presença e muito mais.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { label: "+2.500", desc: "Eventos criados" },
              { label: "98%", desc: "Satisfação" },
              { label: "+50k", desc: "Convidados gerenciados" },
              { label: "4.9★", desc: "Avaliação média" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-white">{s.label}</p>
                <p className="text-xs text-white/40 mt-1">{s.desc}</p>
              </div>
            ))}
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
            <h1 className="text-3xl font-bold text-[#111827] mb-2">Bem-vindo de volta</h1>
            <p className="text-[#6B7280]">Entre na sua conta para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#111827]">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#EFE7DE] rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B996]/40 focus:border-[#D4B996] hover:border-[#D4B996]/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#EFE7DE] accent-[#111827]" />
                <span className="text-sm text-[#6B7280]">Lembrar de mim</span>
              </label>
              <Link href="/recuperar-senha" className="text-sm text-[#D4B996] hover:text-[#B8966A] transition-colors">
                Esqueci a senha
              </Link>
            </div>

            <Button type="submit" loading={loading} size="lg" className="w-full">
              Entrar
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[#EFE7DE]" />
            <span className="text-xs text-[#6B7280]">ou continue com</span>
            <div className="flex-1 h-px bg-[#EFE7DE]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#EFE7DE] rounded-xl text-sm font-medium text-[#111827] hover:bg-[#EFE7DE] transition-colors"
              >
                {provider === "Google" ? "🔍" : "🍎"} {provider}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-6">
            Não tem conta?{" "}
            <Link href="/cadastro" className="font-semibold text-[#111827] hover:text-[#D4B996] transition-colors">
              Criar conta grátis
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
