import Link from "next/link";
import { ArrowRight, MessageCircle, Users, BarChart3, Zap, ShieldCheck } from "lucide-react";

const features = [
  { icon: Users, title: "Contacts centralisés", text: "Importez, organisez et segmentez vos contacts depuis un espace unique." },
  { icon: MessageCircle, title: "Campagnes WhatsApp", text: "Préparez et pilotez vos campagnes avec l’API officielle WhatsApp." },
  { icon: BarChart3, title: "Analyses de performance", text: "Suivez les indicateurs essentiels de vos communications." },
  { icon: Zap, title: "Automatisations", text: "Préparez des scénarios pour gagner du temps dans vos échanges." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white">W</span>
          <span className="text-xl font-extrabold tracking-tight">Woke <span className="text-orange-500">Connect</span></span>
        </Link>
        <Link href="/login" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold hover:bg-slate-50">Se connecter</Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:pt-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            <span className="h-2 w-2 rounded-full bg-orange-500" /> Votre marketing WhatsApp, mieux organisé
          </div>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-950 md:text-6xl">
            Connectez votre entreprise à <span className="text-orange-500">ses clients.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Woke Connect rassemble vos contacts, vos campagnes WhatsApp et vos performances dans une plateforme simple et professionnelle.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
              Accéder à la plateforme <ArrowRight size={18} />
            </Link>
            <a href="#fonctionnalites" className="rounded-xl border border-slate-200 px-6 py-4 font-bold text-slate-700 hover:bg-slate-50">Découvrir les fonctionnalités</a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm text-slate-500">
            <ShieldCheck size={18} className="text-emerald-600" /> Pensé pour une gestion structurée et sécurisée des communications.
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-orange-100/70 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div><p className="text-sm font-bold text-slate-900">Vue d’ensemble</p><p className="mt-1 text-xs text-slate-400">Espace de travail</p></div>
              <span className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-bold text-orange-600">Woke Connect</span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-5">
              {[["Contacts","2 450","+12,8 %"],["Campagnes","18","4 en préparation"],["Messages envoyés","8 920","+8,4 %"],["Taux de livraison","97,6 %","Très bon niveau"]].map(([label,value,detail]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-black text-slate-900">{value}</p><p className="mt-1 text-xs font-semibold text-emerald-600">{detail}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between"><p className="font-bold">Activité des campagnes</p><span className="text-xs text-slate-400">Aperçu fictif</span></div>
              <div className="mt-6 flex h-28 items-end gap-2">
                {[38,58,46,76,60,88,69,96,74,84,100,78].map((h,i)=><div key={i} className="flex-1 rounded-t-md bg-orange-500/90" style={{height:`${h}%`}} />)}
              </div>
              <div className="mt-3 flex justify-between text-xs text-slate-400"><span>Début de période</span><span>Fin de période</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-sm font-extrabold uppercase tracking-[.18em] text-orange-500">Fonctionnalités</p><h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Tout l’essentiel pour vos communications WhatsApp.</h2><p className="mt-4 leading-7 text-slate-600">Une base évolutive pour centraliser vos opérations marketing et mieux suivre vos interactions clients.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({icon:Icon,title,text})=><article key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Icon size={23}/></div><h3 className="mt-5 font-extrabold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></article>)}
          </div>
        </div>
      </section>
      <footer className="border-t border-slate-100 px-6 py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} Woke Connect. Tous droits réservés.</footer>
    </main>
  );
}
