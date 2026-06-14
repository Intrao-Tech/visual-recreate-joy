import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { toast } from "@/hooks/use-toast";

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
    sent: "Дякуємо! Ми з вами зв’яжемось.",
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
    sent: "Thank you! We’ll be in touch shortly.",
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
    sent: "Спасибо! Мы скоро свяжемся с вами.",
    or: "Или напишите напрямую:",
  },
};

const EMAIL = "info@anglconsulting.com";
const PHONE = "+380 12 345 67 89";

const Contact = () => {
  const { lang } = useLang();
  const c = COPY[lang];
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Заявка з сайту — ${form.name}`);
    const body = encodeURIComponent(
      `${c.name}: ${form.name}\n${c.email}: ${form.email}\n${c.phone}: ${form.phone}\n\n${form.message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast({ title: c.sent });
  };

  return (
    <section id="contact" className="py-16 md:py-24 container">
      <div className="grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-5">
          <span className="pill">{c.pill}</span>
          <h2 className="mt-6 text-5xl md:text-6xl leading-[1.05]">
            {c.titlePre} <span className="italic text-primary">{c.titleItalic}</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">{c.desc}</p>
          <div className="mt-8 text-sm text-muted-foreground">
            <p className="mb-2">{c.or}</p>
            <a href={`mailto:${EMAIL}`} className="block text-foreground hover:text-primary transition-colors">
              {EMAIL}
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block text-foreground hover:text-primary transition-colors">
              {PHONE}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 rounded-3xl bg-cream-soft p-6 md:p-10 space-y-5">
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
          <button type="submit" className="btn-primary">
            {c.submit}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
