import { Component, OnInit } from '@angular/core';
import {ServerService} from "../../server.service";

@Component({
  selector: 'app-bookscontainer',
  templateUrl: './bookscontainer.component.html',
  styleUrls: ['./bookscontainer.component.css']
})
export class BookscontainerComponent implements OnInit {
  public booksData = [];
  public bookDetail: Array<String>;

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.serverService.getBooks()
      .subscribe(
        (response) => {
          for(let i in response) {
            this.booksData.push([this.parseTitle(response[i]['title']), response[i]['author']])
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  parseTitle(title: String) {
    let removeEBook = function (title) {
      return title.replace('The Project Gutenberg EBook of ', '')
    };

    let removeProj = function (title) {
      let split = title.split('');
      for(let i = 0; i < split.length; i++) {
        if(split[i] === '’') {
          split[i] = '\'';
        }
      }
      title = split.join('');
      return title.replace('Project Gutenberg\'s ', '');
    };

    if(new String(title.split(' ')[title.split(' ').length - 1]).valueOf() === new String('Homer').valueOf()) {
      let str = title.split(' ');
      str.splice(-2, 2);
      title = str.join(' ');
    }

    let arr = title.split(' ');
    if(new String(arr[0].trim()).valueOf() === new String('The'.trim()).valueOf()) {
      return removeEBook(title);
    } else {
      return removeProj(title);
    }
  }

  bookInfo(data: String) {
    let details = [];

    details.push(`Project Gutenberg’s ${data}`);
    details.push(`Project Gutenberg's ${data}`);
    details.push(`The Project Gutenberg EBook of ${data}`);


    this.serverService.getBookContents(details)
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
