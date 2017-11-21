import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public showHide: Boolean;

  constructor(private serverService: ServerService) { this.showHide = false; }

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

  onBrowse() {
    this.showHide = !this.showHide;
  }
}
