"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { User, Bell, Lock, Palette, Globe, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardTitle } from "@/components/ui/Card";
import { mockUser } from "@/mock/events";

const tabs = [
  { id: "perfil", label: "Perfil", icon: User },
  { id: "notificacoes", label: "Notificações", icon: Bell },
  { id: "seguranca", label: "Segurança", icon: Lock },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#111827]">Configurações</h1>
        <p className="text-[#6B7280] text-sm mt-1">Gerencie suas preferências e conta</p>
      </div>

      <div className="flex gap-1 mb-6 bg-white border border-[#EFE7DE] rounded-xl p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-[#111827] text-white" : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === "perfil" && (
          <div className="space-y-5">
            <Card>
              <CardTitle className="mb-6">Informações pessoais</CardTitle>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#EFE7DE]">
                <div className="w-16 h-16 rounded-2xl bg-[#D4B996]/20 flex items-center justify-center text-2xl font-bold text-[#B8966A]">
                  {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{name}</p>
                  <p className="text-sm text-[#6B7280]">{email}</p>
                  <button className="text-xs text-[#D4B996] mt-1 hover:text-[#B8966A] transition-colors">
                    Alterar foto
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <Input label="Nome completo" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input label="Telefone" placeholder="(11) 99999-9999" />
              </div>
            </Card>

            <Card>
              <CardTitle className="mb-6">Plano atual</CardTitle>
              <div className="flex items-center justify-between p-4 bg-[#111827] rounded-xl">
                <div>
                  <p className="text-white font-semibold capitalize">{mockUser.plan} Plan</p>
                  <p className="text-white/50 text-sm">5 eventos · Convidados ilimitados</p>
                </div>
                <Button size="sm" className="bg-[#D4B996] text-[#111827] hover:bg-[#B8966A]">
                  Fazer upgrade
                </Button>
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 transition-colors">
                <Trash2 className="w-4 h-4" />
                Excluir conta
              </button>
              <Button loading={saving} onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                Salvar alterações
              </Button>
            </div>
          </div>
        )}

        {activeTab === "notificacoes" && (
          <Card>
            <CardTitle className="mb-6">Preferências de notificação</CardTitle>
            <div className="space-y-4">
              {[
                { label: "Novos RSVPs", desc: "Quando alguém confirmar ou recusar presença", defaultOn: true },
                { label: "Contribuições PIX", desc: "Quando receber uma nova contribuição", defaultOn: true },
                { label: "Presentes escolhidos", desc: "Quando alguém escolher um presente", defaultOn: true },
                { label: "Lembretes de evento", desc: "Alertas antes do evento acontecer", defaultOn: false },
                { label: "Newsletter", desc: "Dicas e novidades sobre o Evently", defaultOn: false },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between py-3 border-b border-[#EFE7DE] last:border-0">
                  <div>
                    <p className="font-medium text-[#111827] text-sm">{notif.label}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{notif.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={notif.defaultOn} className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#EFE7DE] rounded-full peer peer-checked:bg-[#111827] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "seguranca" && (
          <div className="space-y-5">
            <Card>
              <CardTitle className="mb-6">Alterar senha</CardTitle>
              <div className="space-y-4">
                <Input label="Senha atual" type="password" placeholder="••••••••" />
                <Input label="Nova senha" type="password" placeholder="••••••••" />
                <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
              </div>
              <Button className="mt-4" onClick={handleSave} loading={saving}>Alterar senha</Button>
            </Card>
            <Card>
              <CardTitle className="mb-4">Sessões ativas</CardTitle>
              <div className="space-y-3">
                {[
                  { device: "Chrome · Windows 11", location: "São Paulo, BR", current: true },
                  { device: "Safari · iPhone 15", location: "São Paulo, BR", current: false },
                ].map((session) => (
                  <div key={session.device} className="flex items-center justify-between py-3 border-b border-[#EFE7DE] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#111827]">{session.device}</p>
                      <p className="text-xs text-[#6B7280]">{session.location}</p>
                    </div>
                    {session.current ? (
                      <span className="text-xs text-green-600 font-medium">Sessão atual</span>
                    ) : (
                      <button className="text-xs text-red-500 hover:text-red-700 font-medium">Encerrar</button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
}
