import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  private licenses: null | Observable<string> = this.generatedLicenseFileAvailable
    ? null
    : of('License information is only available in production mode.')

  constructor(
    @Inject(GeneratedLicenseFileAvailable)
    private readonly generatedLicenseFileAvailable: boolean,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer
  ) { }

  public getLicenses(): Observable<string> {
    if (this.licenses === null) {
      this.licenses = this.http
        .get('3rdpartylicenses.txt', { responseType: 'text' })
        .pipe(
          map(licenses => licenses.replace(/(?:\r\n|\r|\n)/g, '<br />')),
          map(licenses => this.sanitizer.sanitize(SecurityContext.HTML, licenses)),
          map(licenses => `${licenses}`)
        )
    }
    return this.licenses
  }
}

export const GeneratedLicenseFileAvailable = new InjectionToken<boolean>('GeneratedLicenseFileAvailable');