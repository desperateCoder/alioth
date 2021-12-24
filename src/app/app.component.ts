import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
    public readonly theming: ThemingService
  ) { }

  ngOnInit(): void {
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
      url: this.document.location.href
    })
  }
}
