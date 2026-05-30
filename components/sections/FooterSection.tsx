import Link from "next/link";
import { Sparkles } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-[#111827] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#D4B996]" />
              </div>
              <span className="font-bold text-white tracking-tight">
                evently<span className="text-[#D4B996]">+</span>
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed">
              A plataforma mais elegante para organizar eventos incríveis.
            </p>
            <div className="flex gap-3 mt-4">
              {["IG", "TW", "IN"].map((label, i) => (
                <button key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-white/60 text-xs font-bold">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Produto", links: ["Recursos", "Como funciona", "Templates", "Preços", "Changelog"] },
            { title: "Tipos de Evento", links: ["Casamentos", "Aniversários", "Formaturas", "Chá de Bebê", "Corporativos"] },
            { title: "Empresa", links: ["Sobre nós", "Blog", "Afiliados", "Privacidade", "Termos"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-white/40 hover:text-white/80 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">© 2025 Evently. Feito com ❤️ no Brasil.</p>
          <p className="text-sm text-white/30">Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
