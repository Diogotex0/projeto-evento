"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { QrCode, Copy, Check, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { mockEvents } from "@/mock/events";
import { formatCurrency } from "@/lib/utils";
import { FAKE_QR_SVG } from "@/constants";

const pixTransactions = [
  { id: "pix-1", name: "Carlos Mendes", value: 200, date: "18/05", message: "Presente para os noivos! 🎊" },
  { id: "pix-2", name: "Fernanda Costa", value: 150, date: "17/05", message: "Com muito carinho!" },
  { id: "pix-3", name: "Ricardo Alves", value: 500, date: "15/05", message: "Lua de mel abençoada!" },
  { id: "pix-4", name: "Patrícia Lima", value: 300, date: "12/05", message: "" },
  { id: "pix-5", name: "Marcos Souza", value: 100, date: "10/05", message: "Parabéns! 🥂" },
];


export default function PixPage() {
  const [copied, setCopied] = useState(false);
  const event = mockEvents[0];
  const total = pixTransactions.reduce((acc, t) => acc + t.value, 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(event.pixKey ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">PIX & Contribuições</h1>
        <p className="text-[#6B7280] text-sm mt-1">Gerencie as contribuições via PIX do seu evento</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1"
        >
          <Card>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#6C8EBF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-7 h-7 text-[#6C8EBF]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1">QR Code PIX</h3>
              <p className="text-sm text-[#6B7280] mb-5">Compartilhe para receber contribuições</p>

              <div className="bg-[#FAF8F5] border border-[#EFE7DE] rounded-2xl p-4 mb-4 inline-block">
                <img src={FAKE_QR_SVG} alt="QR Code PIX" className="w-40 h-40 mx-auto" />
              </div>

              <div className="bg-[#FAF8F5] border border-[#EFE7DE] rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#6B7280] text-left">Chave PIX</p>
                  <p className="text-sm font-medium text-[#111827] truncate text-left">{event.pixKey}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    copied ? "bg-green-100 text-green-700" : "bg-white border border-[#EFE7DE] text-[#6B7280] hover:border-[#D4B996]"
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>

              <div className="text-left space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Beneficiário</span>
                  <span className="font-medium text-[#111827]">{event.pixName}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <div className="flex items-center justify-between mb-3">
                <Wallet className="w-5 h-5 text-[#D4B996]" />
                <Badge variant="success" size="sm">Ativo</Badge>
              </div>
              <p className="text-3xl font-bold text-[#111827]">{formatCurrency(total)}</p>
              <p className="text-sm text-[#6B7280] mt-1">Total arrecadado</p>
              <div className="flex items-center gap-1 text-green-600 text-xs mt-2">
                <TrendingUp className="w-3.5 h-3.5" />
                +12% esta semana
              </div>
            </Card>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <QrCode className="w-5 h-5 text-[#6C8EBF]" />
              </div>
              <p className="text-3xl font-bold text-[#111827]">{pixTransactions.length}</p>
              <p className="text-sm text-[#6B7280] mt-1">Contribuições</p>
              <p className="text-xs text-[#6B7280] mt-2">Média: {formatCurrency(total / pixTransactions.length)}</p>
            </Card>
          </div>

          <Card padding="none">
            <div className="px-5 py-4 border-b border-[#EFE7DE]">
              <h3 className="font-semibold text-[#111827]">Últimas contribuições</h3>
            </div>
            <div className="divide-y divide-[#FAF8F5]">
              {pixTransactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="w-9 h-9 bg-green-50 border border-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">💳</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[#111827]">{tx.name}</p>
                    {tx.message && (
                      <p className="text-xs text-[#6B7280] truncate">"{tx.message}"</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#111827] text-sm">+{formatCurrency(tx.value)}</p>
                    <p className="text-xs text-[#6B7280]">{tx.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
