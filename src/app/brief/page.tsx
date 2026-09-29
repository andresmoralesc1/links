'use client';

import { ParticlesBackground } from '@/components/ParticlesBackground';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { useLocale } from '@/i18n/LocaleProvider';

export default function BriefPage() {
  const { t } = useLocale();

  return (
    <div className="relative">
      <ParticlesBackground id="brief-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[520px] px-6 pt-10 pb-16 md:px-10 md:pt-14">
        <header className="flex flex-col items-center text-center mb-8">
          <a
            href="/"
            className="text-xs text-secondary/60 hover:text-accent transition-colors mb-6"
          >
            {t('briefBack')}
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-secondary">
            {t('briefTitle')}
          </h1>
          <p className="mt-1.5 text-sm text-secondary/70 max-w-[420px]">
            {t('briefIntro')}
          </p>
        </header>

        <form
          action="mailto:info@andresmorales.com.co"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <Field name={t('fieldNombre')} formName="Nombre" required />
          <Field name={t('fieldEmail')} formName="Email" type="email" required />
          <Field
            name={t('fieldWhatsApp')}
            formName="WhatsApp"
            type="tel"
            placeholder={t('fieldWhatsAppPlaceholder')}
          />

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-secondary">
              {t('fieldTipo')} <span className="text-accent">*</span>
            </span>
            <select
              name="Tipo de proyecto"
              required
              className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
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

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-secondary">
              {t('fieldDescripcion')} <span className="text-accent">*</span>
            </span>
            <textarea
              name="Descripción"
              required
              rows={4}
              placeholder={t('fieldDescripcionPlaceholder')}
              className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none placeholder:text-secondary/40 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 resize-y"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 font-medium text-secondary transition-colors hover:bg-accent/90"
          >
            {t('briefSubmit')}
          </button>
          <p className="text-xs text-secondary/50 text-center">
            {t('briefHelp')}
          </p>
        </form>

        <LocaleSwitcher />
      </main>
    </div>
  );
}

function Field({
  name,
  formName,
  type = 'text',
  required = false,
  placeholder,
}: {
  name: string;
  formName: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-secondary">
        {name} {required && <span className="text-accent">*</span>}
      </span>
      <input
        name={formName}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none placeholder:text-secondary/40 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
