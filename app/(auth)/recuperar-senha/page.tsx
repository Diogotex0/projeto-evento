"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#D4B996]" />
            </div>
            <span className="font-bold text-[#111827] text-xl">
              evently<span className="text-[#D4B996]">+</span>
            </span>
          </Link>
        </div>

        <div className="bg-white border border-[#EFE7DE] rounded-2xl p-8">
          {!sent ? (
            <>
              <div className="w-12 h-12 bg-[#D4B996]/15 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-[#B8966A]" />
              </div>
              <h1 className="text-2xl font-bold text-[#111827] mb-2">Recuperar senha</h1>
              <p className="text-[#6B7280] text-sm mb-6">
                Informe seu email e enviaremos um link para redefinir sua senha.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" loading={loading} size="lg" className="w-full">
                  Enviar link de recuperação
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-2">Email enviado!</h2>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Enviamos um link de recuperação para{" "}
                <span className="font-semibold text-[#111827]">{email}</span>.
                <br />
                Verifique sua caixa de entrada.
              </p>
            </motion.div>
          )}

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
