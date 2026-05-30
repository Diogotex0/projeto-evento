"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Templates", href: "#templates" },
  { label: "Preços", href: "#precos" },
  { label: "Recursos", href: "#recursos" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-[#EFE7DE] rounded-2xl px-5 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#111827] rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4B996]" />
              </div>
              <span className="font-bold text-[#111827] tracking-tight">
                evently<span className="text-[#D4B996]">+</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-[#111827]">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button size="sm" className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]">
                <Link href="/cadastro">Criar evento</Link>
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#EFE7DE] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-[#EFE7DE] flex flex-col gap-3"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#6B7280] hover:text-[#111827] py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login" className="w-full text-center py-2.5 text-sm font-medium text-[#111827] border border-[#EFE7DE] rounded-xl hover:bg-[#EFE7DE] transition-colors">
                  Entrar
                </Link>
                <Link href="/cadastro" className="w-full text-center py-2.5 text-sm font-medium bg-[#D4B996] text-[#111827] rounded-xl hover:bg-[#B8966A] transition-colors">
                  Criar evento
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
