import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
  constructor(private http: Http) {}

  saveBooks() {
    return this.http.get('/api/saveBooks');
  }

  getBooks() {
    return this.http.get('/api/getBooks');
  }

  getFirstPageOfBook() {
    return this.http.get('/api/getFirstPageOfBook');
  }

  togglePages(index: Number) {
    return this.http.post('/api/togglePages', [index]);
  }

}
