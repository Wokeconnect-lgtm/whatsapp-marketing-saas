import Link from "next/link";
import { ArrowUpRight, Contact, MessageCircle, Send, Settings, ChartNoAxesCombined, Users, LayoutDashboard, LogOut } from "lucide-react";

const menu = [
  { label: "Vue d’ensemble", icon: LayoutDashboard, active: true },
  { label: "Contacts", icon: Contact },
  { label: "Campagnes", icon: Send },
  { label: "Conversations", icon: MessageCircle },
  { label: "Statistiques", icon: ChartNoAxesCombined },
  { label: "Équipe", icon: Users },
  { label: "Paramètres", icon: Settings },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-5 md:block">
        <Link href="/" className="flex items-center gap-3 px-2 py-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 font-black text-white">W</span><span className="font-black">Woke <span className="text-orange-500">Connect</span></span></Link>
        <p className="mb-3 mt-10 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Espace de travail</p>
        <nav className="space-y-1">{menu.map(({label,icon:Icon,active})=><div key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active?"bg-orange-50 text-orange-600":"text-slate-600"}`}><Icon size={18}/>{label}</div>)}</nav>
        <div className="absolute bottom-6 text-xs text-slate-400">Woke Connect · Version initiale</div>
      </aside>
      <section className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5"><div><p className="text-sm text-slate-500">Espace de travail</p><h1 className="text-xl font-black text-slate-950">Vue d’ensemble</h1></div><Link href="/login" className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"><LogOut size={16}/> Connexion</Link></header>
        <div className="p-6 md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-black text-slate-950">Bonjour et bienvenue !</h2><p className="mt-1 text-slate-500">Voici un aperçu de votre activité sur Woke Connect.</p></div><span className="rounded-xl bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">Espace de démonstration</span></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[["Contacts","0","À connecter"],["Campagnes","0","À configurer"],["Messages envoyés","0","Aucune donnée"],["Taux de livraison","—","Disponible après connexion"]].map(([label,value,sub])=><article key={label} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-semibold text-slate-500">{label}</p><p className="mt-3 text-3xl font-black text-slate-950">{value}</p><p className="mt-2 text-xs text-slate-400">{sub}</p></article>)}
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 xl:col-span-2"><div className="flex items-center justify-between"><h3 className="font-extrabold text-slate-900">Démarrer avec Woke Connect</h3><ArrowUpRight size={18} className="text-slate-400"/></div><p className="mt-2 text-sm leading-6 text-slate-500">Votre espace est prêt à accueillir les premières fonctionnalités. Les données réelles apparaîtront après la connexion à votre base Supabase et à l’API WhatsApp.</p><div className="mt-6 space-y-3">{["Configurer l’authentification et les accès","Relier votre espace à Supabase","Connecter un compte WhatsApp Business officiel","Créer et importer votre première liste de contacts"].map((item,i)=><div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-700"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-black text-orange-600">{i+1}</span>{item}</div>)}</div></article>
            <article className="rounded-2xl bg-slate-950 p-6 text-white"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500"><MessageCircle size={22}/></div><h3 className="mt-5 text-lg font-extrabold">WhatsApp Business</h3><p className="mt-2 text-sm leading-6 text-slate-300">La connexion à l’API officielle sera configurée dans une prochaine étape, avec une gestion sécurisée des comptes de chaque entreprise.</p><span className="mt-6 inline-flex rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-orange-300">Connexion à venir</span></article>
          </div>
        </div>
      </section>
    </main>
  );
}
