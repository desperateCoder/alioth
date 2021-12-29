import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject, takeUntil } from 'rxjs';
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
    public readonly theming: ThemingService
  ) { }

  ngOnInit(): void {
    this.title.setTitle(this.environment.title)
    this.theming.darkModeActive$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(active => this.document.body.classList[active ? 'add' : 'remove'](this.darkThemeClass))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  share(): void {
    window.navigator.share({
      title: this.title.getTitle(),
      url: this.document.location.href
    })
  }
}
