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

  getBookContents(titles: Array<String>) {
    return this.http.post('/api/getBookContents', titles);
  }


}
