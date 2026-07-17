import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { CONTACTS, MAILTO, TEL } from "@/lib/contacts";
import { FacebookIcon, TelegramIcon } from "./BrandIcons";

const COPY = {
  uk: {
    pill: "Контакти",
    titlePre: "Зв’яжіться з",
    titleItalic: "нами",
    desc: "Залиште заявку — відповімо протягом робочого дня та запропонуємо безкоштовну консультацію.",
    name: "Ім’я",
    email: "Email",
    phone: "Телефон",
    message: "Розкажіть про вашу задачу",
    submit: "Надіслати →",
    sending: "Надсилаємо…",
    sent: "Дякуємо! Ми з вами зв’яжемось.",
    error: "Не вдалося надіслати. Спробуйте ще раз або напишіть нам на email.",
    or: "Або напишіть напряму:",
  },
  en: {
    pill: "Contact",
    titlePre: "Get in",
    titleItalic: "touch",
    desc: "Leave a request — we’ll reply within one business day and offer a free consultation.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Tell us about your task",
    submit: "Send →",
    sending: "Sending…",
    sent: "Thank you! We’ll be in touch shortly.",
    error: "Couldn’t send your request. Please try again or email us directly.",
    or: "Or reach out directly:",
  },
  ru: {
    pill: "Контакты",
    titlePre: "Свяжитесь с",
    titleItalic: "нами",
    desc: "Оставьте заявку — ответим в течение рабочего дня и предложим бесплатную консультацию.",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    message: "Расскажите о вашей задаче",
    submit: "Отправить →",
    sending: "Отправляем…",
    sent: "Спасибо! Мы скоро свяжемся с вами.",
    error: "Не удалось отправить. Попробуйте ещё раз или напишите нам на email.",
    or: "Или напишите напрямую:",
  },
};

/** `h2` on the homepage, where Hero owns the h1; `h1` when this section is the whole page. */
type ContactProps = { headingAs?: "h1" | "h2" };

const Contact = ({ headingAs: Heading = "h2" }: ContactProps) => {
  const { lang } = useLang();
  const c = COPY[lang];
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  // Honeypot: invisible to humans, bots fill it; the Worker drops those silently.
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website, lang }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({ title: c.sent });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: c.error, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 container">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <span className="pill">{c.pill}</span>
          <Heading className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            {c.titlePre} <span className="italic text-primary">{c.titleItalic}</span>
          </Heading>
          <p className="mt-6 text-muted-foreground max-w-md">{c.desc}</p>
          <div className="mt-8 text-sm text-muted-foreground">
            <p className="mb-2">{c.or}</p>
            <a href={MAILTO} className="block text-foreground hover:text-primary transition-colors">
              {CONTACTS.email}
            </a>
            <a href={TEL} className="block text-foreground hover:text-primary transition-colors">
              {CONTACTS.phoneDisplay}
            </a>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={CONTACTS.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Telegram ${CONTACTS.telegramHandle}`}
                title={`Telegram ${CONTACTS.telegramHandle}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href={CONTACTS.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 rounded-3xl bg-cream-soft p-6 md:p-10 space-y-5">
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.name}</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full rounded-full bg-background border border-border px-5 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.email}</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full rounded-full bg-background border border-border px-5 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.phone}</span>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-2 w-full rounded-full bg-background border border-border px-5 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.message}</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full rounded-3xl bg-background border border-border px-5 py-3 text-sm outline-none focus:border-primary resize-none"
            />
          </label>
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60 disabled:pointer-events-none">
            {submitting ? c.sending : c.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
