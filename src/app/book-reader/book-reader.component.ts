import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  public bookContent;
  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getOneBook()
      .subscribe(
        (response) => {
          this.bookContent = JSON.parse(response.text());
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
