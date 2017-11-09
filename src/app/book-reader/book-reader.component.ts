import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.css']
})
export class BookReaderComponent implements OnInit {
  public bookContent;
  public pageCount = 0;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getFirstPageOfBook()
      .subscribe(
        (response) => {
          this.bookContent = JSON.parse(response.text());
        },
        (error) => {
          console.log(error);
        }
      )
  }

  recieveNextPage(index: Number) {
    this.pageCount++;
    this.serverService.togglePages(this.pageCount)
      .subscribe(
        response => {
          this.bookContent = JSON.parse(response.text());
        },
        (error) => {
          console.log(error);
        }
      )
  }

  recievePreviousPage(index: Number) {
    this.pageCount--;
    this.serverService.togglePages(this.pageCount)
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
