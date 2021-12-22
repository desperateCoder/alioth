import { Component, HostBinding, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme, ThemeingService as ThemingService } from './themeing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly unsubscribe$ = new Subject<void>()
  readonly Theme = Theme
  readonly environment = environment

  @HostBinding('class.custom-theme-dark')
  darkTheme: boolean = false

  constructor(
    public theming: ThemingService
  ) { }

  ngOnInit(): void {
    this.theming.darkModeActive$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(active => this.darkTheme = active)
  }
}
