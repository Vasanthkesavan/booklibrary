import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private serverService: ServerService) { }

  /* OnInit lifecycle hook to save the text files in the path to the database */
  ngOnInit() {
    this.serverService.saveBooks()
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => console.log(error)
      )
  }
}
