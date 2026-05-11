import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soundtrack } from '../models/soundtrack.interface';

@Injectable({
  providedIn: 'root'
})
export class SoundtrackService {
  private jsonUrl = 'assets/data/soundtracks.json';

  constructor(private http: HttpClient) {}

  getSoundtracks(): Observable<Soundtrack[]> {
    return this.http.get<Soundtrack[]>(this.jsonUrl);
  }

  getSoundtrackById(id: number): Observable<Soundtrack> {
    return this.http.get<Soundtrack>(`${this.jsonUrl}?id=${id}`);
  }
}
