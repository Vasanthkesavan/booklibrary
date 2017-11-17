import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServerService {
  constructor(private http: HttpClient) {}

  saveBooks() {
    return this.http.get('/api/saveBooks', {responseType: 'text'});
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
