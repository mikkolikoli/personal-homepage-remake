import 'server-only'
import { AcceptedLanguages } from '@/types'

const translations = {
  fi_FI: () => import('../../../localisation/fi.json').then((module) => module.default),
  en_US: () => import('../../../localisation/en.json').then((module) => module.default),
  de_DE: () => import('../../../localisation/de.json').then((module) => module.default),
}

export const getTranslation = async ( language: AcceptedLanguages ) =>
  translations[language]()