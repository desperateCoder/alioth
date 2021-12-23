import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  constructor(
    @Inject(GeneratedLicenseFileAvailable)
    private readonly generatedLicenseFileAvailable: boolean,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  public getLicenses() {
    return this.generatedLicenseFileAvailable ?
      this.http
        .get('3rdpartylicenses.txt', { responseType: 'text' })
        .pipe(
          map(licenses => licenses.replace(/(?:\r\n|\r|\n)/g, '<br />')),
          map(licenses => this.sanitizer.sanitize(SecurityContext.HTML, licenses))
        )
      : of('License information is only available in production mode.');
  }
}

export const GeneratedLicenseFileAvailable = new InjectionToken<boolean>('GeneratedLicenseFileAvailable');