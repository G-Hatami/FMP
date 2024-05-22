import {createI18n} from 'vue-i18n';
import FA from "./i18n/fa.json";
import EN from "./i18n/en.json";


const messages ={
    FA,
    EN
}

  const i18n = createI18n({
      locale: 'EN',
      fallbackLocale: 'EN',
      messages
  })
export default i18n
// import Vue from 'vue';
// import VueI18n from 'vue-i18n';
//
// Vue.use(VueI18n);
//
// async function loadAllLocaleMessages() {
//     const locales = ['en', 'fa'];
//     const messages = {};
//
//     for (const locale of locales) {
//         const messagesModule = await import(`./locales/${locale}.json`);
//         messages[locale] = messagesModule.default;
//     }
//
//     return messages;
// }
//
// loadAllLocaleMessages().then(messages => {
//     const i18n = new VueI18n({
//         locale: 'en', // set default locale
//         fallbackLocale: 'en', // set fallback locale
//         messages: messages // set loaded messages
//     });
//
//     new Vue({
//         i18n,
//         render: h => h(App)
//     }).$mount('#app');
// });
