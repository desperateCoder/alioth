import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of, ReplaySubject, share, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RomService {

  private data$: null | Observable<any> = null

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<any> {
    if (this.data$ === null) {
      this.data$ = this.http.get<any>('assets/data.json')
    }

    return this.data$
  }
}
