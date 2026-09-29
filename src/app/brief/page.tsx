import type { Metadata } from 'next';
import { profile } from '@/data/links';
import { ParticlesBackground } from '@/components/ParticlesBackground';

export const metadata: Metadata = {
  title: `Brief — ${profile.name}`,
  description: `Cuéntame sobre tu proyecto de automatización, IA o e-commerce.`,
  robots: { index: false, follow: false },
};

export default function BriefPage() {
  return (
    <div className="relative">
      <ParticlesBackground id="brief-particles" variant="soft" />
      <main className="relative z-10 mx-auto w-full max-w-[520px] px-6 pt-10 pb-16 md:px-10 md:pt-14">
        <header className="flex flex-col items-center text-center mb-8">
          <a
            href="/"
            aria-label="Volver"
            className="text-xs text-secondary/60 hover:text-accent transition-colors mb-6"
          >
            ← Volver
          </a>
          <h1 className="text-2xl font-bold tracking-tight text-secondary">
            Brief de Proyecto
          </h1>
          <p className="mt-1.5 text-sm text-secondary/70 max-w-[420px]">
            Cuéntame qué necesitas. Respondo en menos de 24h por WhatsApp o email.
          </p>
        </header>

        <form
          action="mailto:info@andresmorales.com.co"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
        >
          <Field name="Nombre" required />
          <Field name="Email" type="email" required />
          <Field name="WhatsApp" placeholder="+57 324 542 5387" />

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-secondary">
              Tipo de proyecto <span className="text-accent">*</span>
            </span>
            <select
              name="Tipo de proyecto"
              required
              className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona…
              </option>
              <option value="Automatización de procesos">Automatización de procesos</option>
              <option value="IA aplicada">IA aplicada</option>
              <option value="E-commerce / Tienda online">E-commerce / Tienda online</option>
              <option value="Desarrollo a la medida">Desarrollo a la medida</option>
              <option value="Otro">Otro</option>
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-secondary">
              Cuéntame más <span className="text-accent">*</span>
            </span>
            <textarea
              name="Descripción"
              required
              rows={4}
              placeholder="¿Qué problema quieres resolver? ¿Qué resultado esperas?"
              className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 resize-y"
            />
          </label>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center rounded-2xl bg-accent px-5 py-3 font-medium text-secondary transition-colors hover:bg-accent/90"
          >
            Enviar brief →
          </button>
          <p className="text-xs text-secondary/50 text-center">
            Se abrirá tu app de correo con el brief listo para enviar.
          </p>
        </form>
      </main>
    </div>
  );
}

function Field({
  name,
  type = 'text',
  required = false,
  placeholder,
}: {
  name: string;
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
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-secondary outline-none placeholder:text-secondary/40 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
