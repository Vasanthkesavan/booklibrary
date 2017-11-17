import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(private serverService: ServerService) {}

  ngOnInit() {
    this.serverService.saveBooks()
      .subscribe(
        (response) => {
          console.log('this is the title', this.title)
            this.title = 'Book Library';
        },
        (error) => console.log(error)
      )
  }
}
