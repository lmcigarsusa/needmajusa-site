import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRight,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  Container,
  Forklift,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Send,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/needmaj-warehouse-hero-dock-final-v3.jpg";
import portImage from "@/assets/south-florida-port-logistics.jpg";
import logoAsset from "@/assets/needmaj-logo-usa-premium.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "South Florida Warehouse & Cross-Docking | Needmaj" },
      { name: "description", content: "Needmaj provides B2B receiving, cross-docking, palletizing, warehouse storage, transloading, and outbound shipping in Pompano Beach, Florida." },
      { property: "og:title", content: "Needmaj | South Florida Warehouse & Logistics" },
      { property: "og:description", content: "From inbound freight to outbound shipping, Needmaj keeps business freight moving." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Needmaj",
        email: "lm.cigarsusa@gmail.com",
        telephone: "+1-754-357-7323",
        address: { "@type": "PostalAddress", streetAddress: "3480 NW 27th Ave, Ste. E6", addressLocality: "Pompano Beach", addressRegion: "FL", postalCode: "33069", addressCountry: "US" },
        areaServed: "United States",
      }),
    }],
  }),
  component: HomePage,
});

const services = [
  { icon: ArrowDownToLine, title: "Receiving & Unloading", text: "Inbound containers, trailers, pallets, and boxes received and unloaded efficiently." },
  { icon: ArrowRight, title: "Cross-Docking", text: "Move incoming freight toward outbound transportation with minimal storage time." },
  { icon: Boxes, title: "Palletizing", text: "Build and organize secure pallets from loose cartons or incoming freight." },
  { icon: PackageCheck, title: "Stretch / Shrink Wrapping", text: "Protect pallets and prepare freight for transportation or warehouse storage." },
  { icon: Warehouse, title: "Warehouse Storage", text: "Short-term, overflow, pallet, and bulk storage based on current availability." },
  { icon: Container, title: "Transloading", text: "Transfer freight between containers, trucks, trailers, and warehouse handling." },
  { icon: Truck, title: "Outbound Shipping", text: "Prepare pallets, cartons, and freight for LTL, FTL, and other outbound movement." },
  { icon: Ship, title: "Port Drayage", text: "Support for freight moving through South Florida and other major ports." },
];

// Web3Forms public access key: sends quote requests to the inbox it was created with.
// It is designed to be public; it can only deliver to that inbox.
const WEB3FORMS_ACCESS_KEY = "4f7597aa-d6c0-4b2e-aa07-a9b0b2495e7f";

const navItems = [
  ["Services", "#services"], ["Cross-Docking", "#cross-docking"], ["How It Works", "#process"], ["Storage", "#storage"], ["Contact", "#quote"],
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const subject = `Warehouse quote request from ${form.get("company") || form.get("name")}`;
    const message = [
      `Name: ${form.get("name")}`, `Company: ${form.get("company")}`, `Phone: ${form.get("phone")}`, `Email: ${form.get("email")}`,
      `Service: ${form.get("service")}`, `Approx. pallets: ${form.get("pallets") || "Not provided"}`, `Freight type: ${form.get("freight") || "Not provided"}`,
      `Origin: ${form.get("origin") || "Not provided"}`, `Destination: ${form.get("destination") || "Not provided"}`, `Details: ${form.get("details")}`,
    ].join("\n");
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: "Needmaj website",
          replyto: form.get("email"),
          name: form.get("name"),
          email: form.get("email"),
          message,
        }),
      });
      if (!response.ok) throw new Error(`Web3Forms returned ${response.status}`);
      formElement.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="overflow-x-hidden bg-background text-foreground">
      <div className="bg-primary px-5 py-2.5 text-center text-xs font-semibold text-primary-foreground sm:text-sm">
        South Florida warehouse support · Receiving freight from anywhere · Shipping throughout the United States
      </div>
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" aria-label="Needmaj home" className="w-52 shrink-0 sm:w-64"><img src={logoAsset} alt="Needmaj USA" className="h-auto w-full object-contain" /></a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="accent"><a href="#quote">Get a quote</a></Button>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-3 font-semibold">{label}</a>)}<Button asChild variant="accent" className="mt-2"><a href="#quote">Get a quote</a></Button></div>
        </nav>}
      </header>

      <section id="top" className="relative min-h-[680px] bg-primary lg:min-h-[720px]">
        <img src={heroImage} alt="Warehouse team unloading pallet freight from a trailer" width={1600} height={1072} className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_92%,transparent)_43%,color-mix(in_oklab,var(--primary)_24%,transparent)_76%,transparent_100%)]" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-16 lg:min-h-[720px] lg:px-8">
          <div className="max-w-2xl text-primary-foreground">
            <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-accent"><span className="h-px w-10 bg-accent" /> B2B Warehousing · Pompano Beach, FL</p>
            <h1 className="text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl lg:text-8xl">Your freight.<br />Handled from<br /><span className="text-accent">dock to destination.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/85">Receiving · Cross-Docking · Palletizing · Storage · Transloading · Shipping</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild variant="accent" size="lg"><a href="#quote">Get a quote <ArrowRight className="size-5" /></a></Button><Button asChild size="lg" className="border border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20"><a href="tel:+17543577323"><Phone className="size-5" /> Call Jacob</a></Button></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border px-5 sm:grid-cols-4 lg:px-8">
          {["Flexible capacity", "Secure handling", "Port support", "One-stop service"].map((item) => <div key={item} className="flex min-h-24 items-center justify-center gap-2 px-3 text-center text-sm font-bold uppercase sm:min-h-28"><Check className="size-5 shrink-0 text-accent" />{item}</div>)}
        </div>
      </section>

      <section id="process" className="industrial-grid py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionIntro eyebrow="A clear path for your freight" title="Arrive. Receive. Handle. Ship." text="One South Florida operation for the essential steps between arrival and the next destination." />
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[["01","Arrive","Your truck, container, or freight arrives."],["02","Receive","We unload, inspect, and organize the freight."],["03","Handle","We palletize, wrap, sort, store, or cross-dock."],["04","Ship","We prepare freight for its next destination."]].map(([n,t,d]) => <article key={n} className="relative bg-background p-7 lg:p-9"><span className="font-display text-5xl font-bold text-accent">{n}</span><h3 className="mt-10 text-2xl font-bold uppercase">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}
          </div>
        </div>
      </section>

      <section id="cross-docking" className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div><p className="text-sm font-bold uppercase tracking-widest text-accent">Built to keep freight moving</p><h2 className="mt-4 text-5xl font-extrabold uppercase leading-none sm:text-6xl">Cross-docking without unnecessary stops.</h2><p className="mt-6 max-w-xl leading-7 text-primary-foreground/75">Receive inbound freight and move it efficiently toward outbound transportation with minimal storage time. A practical option for businesses that need rapid freight transfer, consolidation, or transloading support.</p><Button asChild variant="accent" size="lg" className="mt-8"><a href="#quote">Discuss your freight <ChevronRight /></a></Button></div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6"><FlowItem icon={Truck} label="Inbound" /><ArrowRight className="size-8 text-accent" /><FlowItem icon={Truck} label="Outbound" /><div className="col-span-3 flex items-center justify-center"><div className="mt-5 flex items-center gap-3 border border-primary-foreground/20 bg-primary-foreground/5 px-6 py-4"><Warehouse className="size-7 text-accent" /><span className="font-display text-xl font-bold uppercase">Needmaj handling</span></div></div></div>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionIntro eyebrow="Warehouse capabilities" title="The services your freight needs." text="Built for businesses moving pallets, boxes, containers, trailers, and larger freight volumes." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(({icon:Icon,title,text}) => <article key={title} className="group border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg"><div className="flex size-12 items-center justify-center bg-secondary text-primary"><Icon className="size-6" /></div><h3 className="mt-7 text-xl font-bold uppercase leading-tight">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section id="storage" className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8"><div><p className="text-sm font-bold uppercase tracking-widest text-primary">Warehouse space when business demands it</p><h2 className="mt-4 text-5xl font-extrabold uppercase leading-none sm:text-6xl">Storage that fits the freight cycle.</h2><p className="mt-6 leading-7 text-muted-foreground">Needmaj supports businesses needing short-term storage, overflow space, pallet storage, bulk inventory space, or a secure place for freight awaiting onward shipment.</p><Button asChild size="lg" className="mt-8"><a href="#quote">Ask about availability</a></Button></div><div className="grid grid-cols-2 gap-3">{["Short-term storage","Overflow capacity","Pallet storage","Bulk inventory"].map((x)=><div key={x} className="flex min-h-36 flex-col justify-between border border-border bg-background p-5"><Warehouse className="size-6 text-accent"/><span className="font-display text-xl font-bold uppercase">{x}</span></div>)}</div></div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionIntro eyebrow="Who we help" title="B2B freight support, built around real operations." text="A practical warehouse partner for companies that need freight received, handled, stored, and moved onward." />
          <div className="mt-10 flex flex-wrap gap-3">{["Importers","Distributors","Manufacturers","Wholesalers","Freight Brokers","Logistics Specialists","Retail Suppliers","Overflow Storage","Container & Pallet Freight"].map((x)=><span key={x} className="border border-border bg-secondary px-5 py-3 text-sm font-bold">{x}</span>)}</div></div>
      </section>

      <section className="relative min-h-[580px] overflow-hidden bg-primary text-primary-foreground">
        <img src={portImage} alt="Container truck operating at a South Florida port" loading="lazy" width={1408} height={912} className="absolute inset-0 h-full w-full object-cover opacity-40"/><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--primary)_10%,color-mix(in_oklab,var(--primary)_88%,transparent)_50%,color-mix(in_oklab,var(--primary)_35%,transparent)_100%)]"/>
        <div className="relative mx-auto flex min-h-[580px] max-w-7xl items-center px-5 py-20 lg:px-8"><div className="max-w-2xl"><div className="flex size-12 items-center justify-center bg-accent text-accent-foreground"><MapPin /></div><p className="mt-7 text-sm font-bold uppercase tracking-widest text-accent">Pompano Beach · South Florida</p><h2 className="mt-4 text-5xl font-extrabold uppercase leading-none sm:text-6xl">From ports to warehouse to anywhere in the U.S.</h2><p className="mt-6 text-lg leading-8 text-primary-foreground/80">Support for freight moving through Port Everglades, Port of Miami, Port of Palm Beach / West Palm Beach, and other major ports. We can receive freight from anywhere and ship it anywhere in the United States, subject to shipment requirements.</p></div></div>
      </section>

      <section id="quote" className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div><p className="text-sm font-bold uppercase tracking-widest text-primary">Let’s move your freight forward</p><h2 className="mt-4 text-5xl font-extrabold uppercase leading-none sm:text-6xl">Tell us what needs handling.</h2><p className="mt-5 leading-7 text-muted-foreground">Share the basics and we'll get back to you with a quote.</p><div className="mt-10 border-t border-border pt-8"><p className="mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Or call us directly</p><div className="space-y-5"><ContactLine icon={Phone} title="Jacob" value="754-357-7323" href="tel:+17543577323"/><ContactLine icon={Mail} title="Email" value="lm.cigarsusa@gmail.com" href="mailto:lm.cigarsusa@gmail.com"/><ContactLine icon={MapPin} title="Warehouse" value="3480 NW 27th Ave, Ste. E6, Pompano Beach, FL 33069" /></div></div></div>
          <form onSubmit={submitQuote} className="border border-border bg-secondary p-6 sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2"><Field label="Name" name="name" required/><Field label="Company" name="company" required/><Field label="Phone" name="phone" type="tel" required/><Field label="Email" name="email" type="email" required/>
              <label className="grid gap-2 text-sm font-bold">Desired service<select name="service" required className="h-12 border border-input bg-background px-3 font-normal outline-none focus:border-primary"><option value="">Select a service</option>{["Receiving","Unloading","Cross-Docking","Palletizing","Wrapping","Storage","Transloading","Outbound Shipping","Port Drayage","Other"].map(x=><option key={x}>{x}</option>)}</select></label>
              <Field label="Approx. number of pallets" name="pallets" inputMode="numeric"/><Field label="Freight type" name="freight"/><Field label="Origin" name="origin"/><Field label="Destination" name="destination"/>
              <label className="grid gap-2 text-sm font-bold sm:col-span-2">Additional details<textarea name="details" required rows={4} className="border border-input bg-background px-3 py-3 font-normal outline-none focus:border-primary" placeholder="What needs to arrive, be handled, stored, or shipped?"/></label>
            </div><Button type="submit" variant="accent" size="lg" className="mt-6 w-full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send quote request"} <Send className="size-5"/></Button>{status === "sent" && <p role="status" className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary"><Check className="size-5"/>Thank you — your request was sent. We'll be in touch shortly.</p>}{status === "error" && <p role="alert" className="mt-4 text-sm font-semibold text-destructive">Something went wrong. Please call Jacob at 754-357-7323.</p>}
          </form>
        </div>
      </section>

       <footer className="bg-primary py-12 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><img src={logoAsset} alt="Needmaj USA" className="h-auto w-64 brightness-0 invert"/><p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/65">B2B receiving, warehousing, cross-docking, palletizing, transloading, and shipping from Pompano Beach, Florida.</p></div><div className="text-sm text-primary-foreground/70"><p>3480 NW 27th Ave, Ste. E6 · Pompano Beach, FL 33069</p><p className="mt-2">© {new Date().getFullYear()} Needmaj. All rights reserved.</p></div></div></footer>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background p-2 shadow-2xl lg:hidden"><Button asChild variant="outline"><a href="tel:+17543577323"><Phone className="size-4"/>Call Jacob</a></Button><Button asChild variant="accent"><a href="#quote">Get a quote</a></Button></div>
    </main>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"><div><p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p><h2 className="mt-3 text-5xl font-extrabold uppercase leading-none sm:text-6xl">{title}</h2></div><p className="max-w-xl leading-7 text-muted-foreground lg:justify-self-end">{text}</p></div>;
}

function FlowItem({ icon: Icon, label }: { icon: typeof Truck; label: string }) { return <div className="flex aspect-square flex-col items-center justify-center border border-primary-foreground/20 bg-primary-foreground/5 p-4"><Icon className="size-12 text-accent sm:size-16"/><span className="mt-4 font-display text-xl font-bold uppercase sm:text-2xl">{label}</span></div>; }

function ContactLine({ icon: Icon, title, value, href }: { icon: typeof Phone; title: string; value: string; href?: string }) { const content=<><span className="flex size-11 shrink-0 items-center justify-center bg-secondary text-primary"><Icon className="size-5"/></span><span><span className="block text-xs font-bold uppercase text-muted-foreground">{title}</span><span className="font-semibold">{value}</span></span></>; return href?<a href={href} className="flex items-center gap-4 hover:text-primary">{content}</a>:<div className="flex items-center gap-4">{content}</div>; }

function Field({ label, name, type="text", required, inputMode }: { label:string; name:string; type?:string; required?:boolean; inputMode?:"numeric" }) { return <label className="grid gap-2 text-sm font-bold">{label}<input name={name} type={type} required={required} inputMode={inputMode} className="h-12 border border-input bg-background px-3 font-normal outline-none focus:border-primary"/></label>; }