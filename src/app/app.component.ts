import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Theme, ThemeingService as ThemingService } from './themeing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  readonly Theme = Theme
  private readonly unsubscribe$ = new Subject<void>()
  @HostBinding('class.dark-theme')
  darkTheme: boolean = false

  constructor(
    public theming: ThemingService
  ) {}

  ngOnInit(): void {
    this.theming.darkModeActive$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(active => this.darkTheme = active)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
