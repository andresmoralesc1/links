'use client';

import { useState, type FormEvent } from 'react';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

export default function BriefPage() {
  const { locale, t } = useLocale();
  const mailtoSubject = encodeURIComponent(t('briefMailSubject'));
  const action = `mailto:info@andresmorales.com.co?subject=${mailtoSubject}`;

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    // Brief visual feedback so a slow network doesn't feel frozen. After the
    // pause, hand off to the mail client via the form action.
    window.setTimeout(() => {
      window.location.href = action;
      // Reset state in case the user returns without sending.
      window.setTimeout(() => setSubmitting(false), 1500);
    }, 600);
  };

  return (
    <div className="relative">
      <ParticlesBackground id="brief-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[520px] px-6 pt-10 pb-16 pt-safe md:px-10 md:pt-14 pb-safe">
        <header className="flex flex-col items-center text-center mb-8">
          <a
            href="/"
            className="text-xs text-secondary/60 dark:text-[#F8F5F4]/60 hover:text-accent transition-colors mb-6"
          >
            {t('briefBack')}
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-secondary dark:text-[#F8F5F4]">
            {t('briefTitle')}
          </h1>
          <p className="mt-1.5 text-sm text-secondary/70 dark:text-[#F8F5F4]/70 max-w-[420px]">
            {t('briefIntro')}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          aria-busy={submitting}
          aria-label={t('briefTitle')}
          className="flex flex-col gap-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#25201c] p-6 shadow-sm"
        >
          <input type="hidden" name="Idioma" value={locale} />

          <Field
            label={t('fieldNombre')}
            formName="Nombre"
            autoComplete="name"
            required
          />
          <Field
            label={t('fieldEmail')}
            formName="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
          />
          <Field
            label={t('fieldWhatsApp')}
            formName="WhatsApp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t('fieldWhatsAppPlaceholder')}
          />

          <label className="flex flex-col gap-1.5 text-base">
            <span className="font-medium text-secondary dark:text-[#F8F5F4]">
              {t('fieldTipo')} <span className="text-accent">*</span>
            </span>
            <select
              name="Tipo de proyecto"
              required
              autoComplete="off"
              className="rounded-xl border border-black/10 dark:border-white/10 bg-background dark:bg-[#15110d] px-3.5 py-2.5 text-base text-secondary dark:text-[#F8F5F4] outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              defaultValue=""
            >
              <option value="" disabled>
                {t('fieldTipoSelect')}
              </option>
              <option value="Automatización de procesos">{t('fieldTipoAuto')}</option>
              <option value="IA aplicada">{t('fieldTipoIA')}</option>
              <option value="E-commerce / Tienda online">{t('fieldTipoEcommerce')}</option>
              <option value="Desarrollo a la medida">{t('fieldTipoDesarrollo')}</option>
              <option value="Otro">{t('fieldTipoOtro')}</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-base">
            <span className="font-medium text-secondary dark:text-[#F8F5F4]">
              {t('fieldDescripcion')} <span className="text-accent">*</span>
            </span>
            <textarea
              name="Descripción"
              required
              rows={4}
              placeholder={t('fieldDescripcionPlaceholder')}
              className="rounded-xl border border-black/10 dark:border-white/10 bg-background dark:bg-[#15110d] px-3.5 py-2.5 text-base text-secondary dark:text-[#F8F5F4] outline-none placeholder:text-secondary/40 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 resize-y"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 font-medium text-secondary transition-colors hover:bg-accent/90 disabled:opacity-70 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {submitting ? t('briefSubmitting') : t('briefSubmit')}
          </button>
          <p className="text-xs text-secondary/50 dark:text-[#F8F5F4]/50 text-center">
            {t('briefHelp')}
          </p>
        </form>

        <LocaleSwitcher />
      </main>
    </div>
  );
}

function Field({
  label,
  formName,
  type = 'text',
  inputMode,
  autoComplete,
  required = false,
  placeholder,
}: {
  label: string;
  formName: string;
  type?: 'text' | 'email' | 'tel';
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal';
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-base">
      <span className="font-medium text-secondary dark:text-[#F8F5F4]">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        name={formName}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-required={required || undefined}
        placeholder={placeholder}
        // text-base (16px) prevents iOS Safari from zooming in on focus.
        className="rounded-xl border border-black/10 dark:border-white/10 bg-background dark:bg-[#15110d] px-3.5 py-2.5 text-base text-secondary dark:text-[#F8F5F4] outline-none placeholder:text-secondary/40 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}