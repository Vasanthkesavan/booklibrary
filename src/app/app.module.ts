import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {ServerService} from '../server.service';
import { BookContainerComponent } from './book-container/book-container.component';
import { BookReaderComponent } from './book-reader/book-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    BookContainerComponent,
    BookReaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
