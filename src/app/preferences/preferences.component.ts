import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from '../i18n.service';
import { Theme, ThemeingService } from '../themeing.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent {

  readonly Theme = Theme

  constructor(
    public readonly theming: ThemeingService,
    public readonly translate: TranslateService,
    public readonly i18n: I18nService
  ) { }
}
