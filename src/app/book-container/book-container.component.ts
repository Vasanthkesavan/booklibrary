import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.css']
})
export class BookContainerComponent implements OnInit {
  public books;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getBooks()
      .subscribe(
        (response) => {
          this.books = JSON.parse(response.text());
        },
        (error) => console.log(error)
      );
  }

}
