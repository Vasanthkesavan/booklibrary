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

  getFirstPageOfBook(title: String) {
    return this.http.post('/api/getFirstPageOfBook', [title]);
  }

  togglePages(index: Number, title: String) {
    return this.http.post('/api/togglePages', [index, title]);
  }

}
