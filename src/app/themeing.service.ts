import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeingService {

  private readonly darkModeActive = new ReplaySubject<boolean>(1)
  public readonly darkModeActive$ = this.darkModeActive.asObservable()

  private readonly darkModeSetting = new ReplaySubject<Theme>(1)
  public readonly darkModeSetting$ = this.darkModeSetting.asObservable()

  private readonly themePersistenceKey = 'theme'
  private readonly themePersistenceValueDark = 'dark'

  private readonly darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  private readonly darkModeMediaListener = (event: MediaQueryListEvent) => this.darkModeActive.next(event.matches)

  constructor() {
    switch (localStorage.getItem(this.themePersistenceKey)) {
      case this.themePersistenceValueDark: {
        this.darkModeActive.next(true)
        this.darkModeSetting.next(Theme.DARK)
        break;
      }
      case null: {
        this.darkModeMedia.addEventListener('change', this.darkModeMediaListener);
        this.darkModeActive.next(this.darkModeMedia.matches)
        this.darkModeSetting.next(Theme.SYSTEM)
        break;
      }
      default: {
        this.darkModeActive.next(false)
        this.darkModeSetting.next(Theme.LIGHT)
        break;
      }
    }
  }

  public setTheme(theme: Theme) {
    this.darkModeSetting.next(theme)
    switch (theme) {
      case Theme.LIGHT: {
        this.darkModeMedia.removeEventListener('change', this.darkModeMediaListener)
        this.darkModeActive.next(false)
        localStorage.setItem(this.themePersistenceKey, 'light')
        break;
      }
      case Theme.DARK: {
        this.darkModeMedia.removeEventListener('change', this.darkModeMediaListener)
        this.darkModeActive.next(true)
        localStorage.setItem(this.themePersistenceKey, this.themePersistenceValueDark)
        break;
      }
      case Theme.SYSTEM: {
        this.darkModeMedia.addEventListener('change', this.darkModeMediaListener)
        this.darkModeActive.next(this.darkModeMedia.matches)
        localStorage.removeItem(this.themePersistenceKey)
        break;
      }
    }
  }
}

export enum Theme {
  LIGHT,
  DARK,
  SYSTEM
}