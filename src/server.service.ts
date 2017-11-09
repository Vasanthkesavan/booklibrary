import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  saveBooks() {
    return this.http.get('/api/saveBooks');
  }
}
