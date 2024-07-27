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
