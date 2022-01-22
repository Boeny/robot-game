import Vue from 'vue';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import VueI18Next from '@panter/vue-i18next';

import LOCALES from './locales.json';
import { MAIN_LANGUAGE } from './constants';

Vue.use(VueI18Next);

(async () => {
    await i18next
        .use(LanguageDetector)
        .init({
            fallbackLng: MAIN_LANGUAGE,
            detection: {
                order: ['navigator'],
                lookupLocalStorage: 'language',
            },
            resources: LOCALES,
        });
})();

const i18n = new VueI18Next(i18next);

export default i18n;
