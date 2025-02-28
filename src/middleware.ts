import { NextResponse, NextRequest } from "next/server";

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// supported languages
const UTSlocales = ['fi_FI', 'en_US', 'de_DE']
// default locale is en_US as english is the most universal language of the three supported languages
const defaultLocale = 'en_US'

// gets the users preferred language
function getLocale(request: NextRequest) {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, UTSlocales, defaultLocale)
}
 
export function middleware(request: NextRequest) {
  // check if pathname has supported locale
  const { pathname } = request.nextUrl
  // check for UTS locale
  const pathnameHasUTSLocale = UTSlocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasUTSLocale) return

  // get the user's preferred language if not in pathname
  const userPreferredLanguage = getLocale(request)
  request.nextUrl.pathname = `/${userPreferredLanguage}${pathname}`

  // redirect according to language preference
  return NextResponse.redirect(request.nextUrl)
}