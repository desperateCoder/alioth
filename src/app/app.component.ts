import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme, ThemeingService as ThemingService } from './themeing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$ = new Subject<void>()
  private readonly darkThemeClass = 'custom-theme-dark'
  readonly supportsSharing = 'share' in window.navigator
  readonly Theme = Theme
  readonly environment = environment

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(Title) private readonly title: Title,
    public readonly theming: ThemingService,
    public readonly translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.theming.darkModeActive$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(active => this.document.body.classList[active ? 'add' : 'remove'](this.darkThemeClass))

    this.translate.store.onLangChange
      .pipe(
        takeUntil(this.unsubscribe$),
        map(lang => lang.lang),
        switchMap(() => this.translate.get('Title', environment))
      )
      .subscribe(title => this.title.setTitle(title))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  setLanguage(language: string): void {
    this.translate.use(language)
  }

  share(): void {
    window.navigator.share({
      title: this.title.getTitle(),
      url: this.document.location.href
    })
  }
}
