import { createI18n } from 'vue-i18n';
import { watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('./locales/*.json', { eager: true })
  ).map(([key, value]) => [key.slice(10, -5), value.default])
);

async function setDayjsLocale(locale: string) {
  try {
    switch (locale) {
      case 'ar':
        await import('dayjs/locale/ar');
        break;
      case 'es':
        await import('dayjs/locale/es');
        break;
      case 'fr':
        await import('dayjs/locale/fr');
        break;
      case 'de':
        await import('dayjs/locale/de');
        break;
      case 'pt':
      case 'pt-br':
        await import('dayjs/locale/pt-br');
        locale = 'pt-br';
        break;
      case 'id':
        await import('dayjs/locale/id');
        break;
      case 'cn':
        await import('dayjs/locale/zh-cn');
        locale = 'zh-cn';
        break;
      case 'hi':
        await import('dayjs/locale/hi');
        break;
      default:
        // Assuming English is the default and already imported
        break;
    }
    dayjs.locale(locale);
  } catch (error) {
    console.error(`Failed to load dayjs locale for ${locale}:`, error);
    dayjs.locale('en'); // Fallback to English
  }
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  fallbackLocale: 'en',
  messages,
});

// Set dayjs locale initially
setDayjsLocale(i18n.global.locale.value);

// Correct usage of watch
watch(
  () => i18n.global.locale.value,
  (newLocale) => {
    setDayjsLocale(newLocale);
  }
);

export default i18n;
