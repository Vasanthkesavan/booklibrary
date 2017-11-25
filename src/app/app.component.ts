import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public showHide: Boolean;

  constructor(private serverService: ServerService) { this.showHide = false; }

  ngOnInit() {
    this.serverService.saveBooks()
      .subscribe(
        (response) => {
        },
        (error) => console.log(error)
      )
  }

  onBrowse() {
    this.showHide = !this.showHide;
  }
}
