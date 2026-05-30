"use client";
import { Sidebar } from "./Sidebar";
import { ToastProvider } from "@/components/ui/Toast";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebar, setMobileSidebar] = useState(false);

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#FAF8F5]">
        <div className="hidden lg:block flex-shrink-0">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>

        <AnimatePresence>
          {mobileSidebar && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileSidebar(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                className="fixed left-0 top-0 z-50 h-full lg:hidden"
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1 min-w-0">
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-[#EFE7DE] sticky top-0 z-30">
            <button
              onClick={() => setMobileSidebar(true)}
              aria-label="Abrir menu de navegação"
              className="p-2 rounded-lg hover:bg-[#EFE7DE] transition-colors"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="font-bold text-[#111827]">
              evently<span className="text-[#D4B996]">+</span>
            </span>
          </div>
          <div className="p-4 md:p-8">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
