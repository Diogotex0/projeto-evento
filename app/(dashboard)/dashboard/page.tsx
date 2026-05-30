"use client";
import { motion } from "framer-motion";
import { Users, CheckCircle, Clock, XCircle, Gift, QrCode, TrendingUp, Eye, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { mockDashboardStats, mockEvents, mockChartData, mockUser } from "@/mock/events";
import { formatDate, formatCurrency } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const statsCards = [
  { label: "Total de Convidados", value: mockDashboardStats.totalGuests, icon: Users, color: "bg-[#6C8EBF]/10", iconColor: "text-[#6C8EBF]", sub: "100% do total", badge: null },
  { label: "Confirmados", value: mockDashboardStats.confirmed, icon: CheckCircle, color: "bg-green-50", iconColor: "text-green-600", sub: `${Math.round((mockDashboardStats.confirmed / mockDashboardStats.totalGuests) * 100)}% do total`, badge: "success" },
  { label: "Não responderam", value: mockDashboardStats.pending, icon: Clock, color: "bg-amber-50", iconColor: "text-amber-600", sub: `${Math.round((mockDashboardStats.pending / mockDashboardStats.totalGuests) * 100)}% do total`, badge: "warning" },
  { label: "Recusados", value: mockDashboardStats.declined, icon: XCircle, color: "bg-red-50", iconColor: "text-red-500", sub: `${Math.round((mockDashboardStats.declined / mockDashboardStats.totalGuests) * 100)}% do total`, badge: "danger" },
];

const PIE_COLORS = ["#A8C3B0", "#EFE7DE", "#F87171"];

const pieData = [
  { name: "Confirmados", value: mockDashboardStats.confirmed },
  { name: "Pendentes", value: mockDashboardStats.pending },
  { name: "Recusados", value: mockDashboardStats.declined },
];

export default function DashboardPage() {
  const currentEvent = mockEvents[0];

  return (
    <div>
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-[#6B7280] text-sm mb-1">Olá, {mockUser.name.split(" ")[0]}! 👋</p>
          <h1 className="text-2xl font-bold text-[#111827]">Aqui está o resumo do seu evento.</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#EFE7DE] rounded-xl px-4 py-2.5 text-sm">
            <div className="w-6 h-6 rounded-md overflow-hidden">
              <img src={currentEvent.banner} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-medium text-[#111827]">{currentEvent.name}</span>
          </div>
          <Link href={`/evento/${currentEvent.id}`} target="_blank">
            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
              Ver evento
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-[#111827]">{card.value}</p>
                <p className="text-xs text-[#6B7280] mt-1">{card.sub}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Visão geral</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-32 h-32 flex-shrink-0">
                <PieChart width={128} height={128}>
                  <Pie data={pieData} cx={60} cy={60} innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={PIE_COLORS[idx]} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#111827]">
                      {Math.round((mockDashboardStats.confirmed / mockDashboardStats.totalGuests) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "Confirmados", value: mockDashboardStats.confirmed, color: "bg-[#A8C3B0]" },
                  { label: "Não responderam", value: mockDashboardStats.pending, color: "bg-[#EFE7DE]" },
                  { label: "Recusados", value: mockDashboardStats.declined, color: "bg-red-300" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color} flex-shrink-0`} />
                    <span className="text-xs text-[#6B7280]">{item.label}</span>
                    <span className="text-xs font-semibold text-[#111827] ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-3"
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Respostas ao longo do tempo</h3>
              <Badge variant="default">Últimos 30 dias</Badge>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={mockChartData}>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "white", border: "1px solid #EFE7DE", borderRadius: 12, fontSize: 12 }}
                  cursor={{ stroke: "#EFE7DE" }}
                />
                <Line type="monotone" dataKey="confirmados" stroke="#A8C3B0" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="pendentes" stroke="#D4B996" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#111827]">Presentes escolhidos</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">{mockDashboardStats.giftsChosen} / {mockDashboardStats.giftsTotal} itens</p>
              </div>
              <Gift className="w-5 h-5 text-[#D4B996]" />
            </div>
            <div className="w-full bg-[#EFE7DE] rounded-full h-2 mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(mockDashboardStats.giftsChosen / mockDashboardStats.giftsTotal) * 100}%` }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-[#D4B996] h-2 rounded-full"
              />
            </div>
            <p className="text-sm text-[#6B7280]">
              <span className="font-semibold text-[#111827]">{Math.round((mockDashboardStats.giftsChosen / mockDashboardStats.giftsTotal) * 100)}%</span> concluída
            </p>
            <Link href="/presentes">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Gerenciar lista de presentes
              </Button>
            </Link>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[#111827]">Total arrecadado via PIX</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Atualizado há 2h</p>
              </div>
              <QrCode className="w-5 h-5 text-[#6C8EBF]" />
            </div>
            <p className="text-3xl font-bold text-[#111827] mb-1">{formatCurrency(mockDashboardStats.pixTotal)}</p>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">+12% esta semana</span>
            </div>
            <Link href="/pix">
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Ver área PIX
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#111827]">Meus eventos</h3>
            <Link href="/eventos/criar">
              <Button size="sm" className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]">Criar evento</Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {mockEvents.map((event) => (
              <Link key={event.id} href={`/eventos/${event.id}`}>
                <div className="group border border-[#EFE7DE] rounded-xl overflow-hidden hover:border-[#D4B996]/50 hover:shadow-sm transition-all">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={event.banner} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="gold" size="sm">{event.type}</Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-[#111827] text-sm truncate">{event.name}</p>
                    <p className="text-xs text-[#6B7280] mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
