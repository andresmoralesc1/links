export const defaultLocale = 'es' as const;
export const locales = ['es', 'en', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { flag: string; label: string }> = {
  es: { flag: '🇨🇴', label: 'Español' },
  en: { flag: '🇺🇸', label: 'English' },
  pt: { flag: '🇧🇷', label: 'Português' },
};

export type MessageKey =
  | 'bio'
  | 'profileName'
  | 'footer'
  | 'navAria'
  | 'whatsappLabel'
  | 'landingLabel'
  | 'briefLabel'
  | 'portfolioLabel'
  | 'gatoLabel'
  | 'barriotechLabel'
  | 'linkedinLabel'
  | 'emailLabel'
  | 'instagramLabel'
  | 'facebookLabel'
  | 'briefTitle'
  | 'briefIntro'
  | 'briefBack'
  | 'fieldNombre'
  | 'fieldEmail'
  | 'fieldWhatsApp'
  | 'fieldWhatsAppPlaceholder'
  | 'fieldTipo'
  | 'fieldTipoSelect'
  | 'fieldTipoAuto'
  | 'fieldTipoIA'
  | 'fieldTipoEcommerce'
  | 'fieldTipoDesarrollo'
  | 'fieldTipoOtro'
  | 'fieldDescripcion'
  | 'fieldDescripcionPlaceholder'
  | 'briefSubmit'
  | 'briefHelp'
  | 'briefMailSubject'
  | 'briefSubmitting'
  | 'notFoundTitle'
  | 'notFoundBody'
  | 'notFoundHome'
  | 'errorTitle'
  | 'errorBody'
  | 'errorRetry';

export const messages: Record<Locale, Record<MessageKey, string>> = {
  es: {
    bio: 'Automatización de procesos e IA para negocios',
    profileName: 'Andrés Morales',
    footer: 'Hecho con ❤ en Colombia',
    navAria: 'Enlaces de Andrés Morales',
    whatsappLabel: 'Hablar por WhatsApp',
    landingLabel: 'andresmorales.com.co',
    briefLabel: 'Iniciar Proyecto',
    portfolioLabel: 'Portafolio',
    gatoLabel: 'El Gato Colectivo',
    barriotechLabel: 'Barriotech',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    briefTitle: 'Brief de Proyecto',
    briefIntro:
      'Cuéntame qué necesitas. Respondo en menos de 24h por WhatsApp o email.',
    briefBack: '← Volver',
    fieldNombre: 'Nombre',
    fieldEmail: 'Email',
    fieldWhatsApp: 'WhatsApp',
    fieldWhatsAppPlaceholder: '+57 324 542 5387',
    fieldTipo: 'Tipo de proyecto',
    fieldTipoSelect: 'Selecciona…',
    fieldTipoAuto: 'Automatización de procesos',
    fieldTipoIA: 'IA aplicada',
    fieldTipoEcommerce: 'E-commerce / Tienda online',
    fieldTipoDesarrollo: 'Desarrollo a la medida',
    fieldTipoOtro: 'Otro',
    fieldDescripcion: 'Cuéntame más',
    fieldDescripcionPlaceholder:
      '¿Qué problema quieres resolver? ¿Qué resultado esperas?',
    briefSubmit: 'Enviar brief →',
    briefHelp: 'Se abrirá tu app de correo con el brief listo para enviar.',
    briefMailSubject: 'Nuevo Brief — andresmorales.com.co',
    briefSubmitting: 'Enviando…',
  },
  en: {
    bio: 'Process automation & AI for business',
    profileName: 'Andrés Morales',
    footer: 'Made with ❤ in Colombia',
    navAria: "Andrés Morales's links",
    whatsappLabel: 'Chat on WhatsApp',
    landingLabel: 'andresmorales.com.co',
    briefLabel: 'Start a Project',
    portfolioLabel: 'Portfolio',
    gatoLabel: 'El Gato Colectivo',
    barriotechLabel: 'Barriotech',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    briefTitle: 'Project Brief',
    briefIntro:
      'Tell me what you need. I reply within 24h via WhatsApp or email.',
    briefBack: '← Back',
    fieldNombre: 'Name',
    fieldEmail: 'Email',
    fieldWhatsApp: 'WhatsApp',
    fieldWhatsAppPlaceholder: '+1 555 123 4567',
    fieldTipo: 'Project type',
    fieldTipoSelect: 'Select…',
    fieldTipoAuto: 'Process automation',
    fieldTipoIA: 'Applied AI',
    fieldTipoEcommerce: 'E-commerce / Online store',
    fieldTipoDesarrollo: 'Custom development',
    fieldTipoOtro: 'Other',
    fieldDescripcion: 'Tell me more',
    fieldDescripcionPlaceholder:
      'What problem are you trying to solve? What outcome do you expect?',
    briefSubmit: 'Send brief →',
    briefHelp: 'Your mail app will open with the brief ready to send.',
    briefMailSubject: 'New Brief — andresmorales.com.co',
    briefSubmitting: 'Sending…',
    notFoundTitle: 'Page not found',
    notFoundBody:
      "The link you followed doesn't exist or was moved. Go back home to find what you're looking for.",
    notFoundHome: '← Back to home',
    errorTitle: 'Something went wrong',
    errorBody: 'An unexpected error occurred. Try again or go back home.',
    errorRetry: 'Retry',
  },
  pt: {
    bio: 'Automação de processos e IA para negócios',
    profileName: 'Andrés Morales',
    footer: 'Feito com ❤ na Colômbia',
    navAria: 'Links de Andrés Morales',
    whatsappLabel: 'Falar no WhatsApp',
    landingLabel: 'andresmorales.com.co',
    briefLabel: 'Iniciar Projeto',
    portfolioLabel: 'Portfólio',
    gatoLabel: 'El Gato Colectivo',
    barriotechLabel: 'Barriotech',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'E-mail',
    instagramLabel: 'Instagram',
    facebookLabel: 'Facebook',
    briefTitle: 'Brief de Projeto',
    briefIntro:
      'Conte o que você precisa. Respondo em menos de 24h pelo WhatsApp ou e-mail.',
    briefBack: '← Voltar',
    fieldNombre: 'Nome',
    fieldEmail: 'E-mail',
    fieldWhatsApp: 'WhatsApp',
    fieldWhatsAppPlaceholder: '+55 11 91234 5678',
    fieldTipo: 'Tipo de projeto',
    fieldTipoSelect: 'Selecione…',
    fieldTipoAuto: 'Automação de processos',
    fieldTipoIA: 'IA aplicada',
    fieldTipoEcommerce: 'E-commerce / Loja online',
    fieldTipoDesarrollo: 'Desenvolvimento sob medida',
    fieldTipoOtro: 'Outro',
    fieldDescripcion: 'Conte mais',
    fieldDescripcionPlaceholder:
      'Qual problema você quer resolver? Que resultado espera?',
    briefSubmit: 'Enviar brief →',
    briefHelp: 'Seu app de e-mail abrirá com o brief pronto para enviar.',
    briefMailSubject: 'Novo Brief — andresmorales.com.co',
    briefSubmitting: 'Enviando…',
    notFoundTitle: 'Página no encontrada',
    notFoundBody:
      'El enlace que seguiste no existe o se movió. Vuelve al inicio para encontrar lo que buscas.',
    notFoundHome: '← Volver al inicio',
    errorTitle: 'Algo salió mal',
    errorBody:
      'Ocurrió un error inesperado. Inténtalo de nuevo o vuelve al inicio.',
    errorRetry: 'Reintentar',
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
