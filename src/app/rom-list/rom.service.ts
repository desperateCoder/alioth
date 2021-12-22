import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, map, Observable, of, ReplaySubject, share, Subject, tap } from 'rxjs';
import { Data } from '../schema';

@Injectable({
  providedIn: 'root'
})
export class RomService {

  private data$: null | Observable<Data> = null

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<Data> {
    if (this.data$ === null) {
      this.data$ = this.http.get<Data>('assets/data.json')
    }

    return this.data$
  }
}
