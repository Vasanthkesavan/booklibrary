import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-bookscontainer',
  templateUrl: './bookscontainer.component.html',
  styleUrls: ['./bookscontainer.component.css']
})
export class BookscontainerComponent implements OnInit {
  public booksData = [];

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getBooks()
      .subscribe(
        (response) => {
          for(let i in response) {
            this.booksData.push(response[i]['title'])
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
