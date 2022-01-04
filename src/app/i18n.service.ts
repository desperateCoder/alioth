import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private readonly langPersistenceKey = 'lang'
  private readonly defaultLang = this.translate.getBrowserLang() || this.translate.defaultLang
  private preferredLang = this.defaultLang

  constructor(private translate: TranslateService) {
    this.translate.langs = ['en', 'de']
    this.translate.use(localStorage.getItem(this.langPersistenceKey) || this.defaultLang)
  }

  public setPreferredLanguage(lang: string | undefined) {
    this.preferredLang = lang || this.defaultLang
    this.translate.use(this.preferredLang)
    if (lang === undefined) {
      localStorage.removeItem(this.langPersistenceKey)
    } else {
      localStorage.setItem(this.langPersistenceKey, lang)
    }
  }

  public getPreferredLanguage(): string {
    return this.preferredLang
  }
}
