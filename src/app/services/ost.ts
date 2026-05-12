import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OstService {

  constructor(private http: HttpClient) {}

  getOsts() {
    return this.http.get<any[]>('public/assets/data/osts.json');
  }
}
export class Ost {
}
