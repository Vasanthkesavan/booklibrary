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
            this.title = response.text();
        },
        (error) => console.log(error)
      )
  }
}
