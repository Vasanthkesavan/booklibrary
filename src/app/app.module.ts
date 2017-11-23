import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {ServerService} from '../server.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridListModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import { SignupComponent } from './signup/signup.component';
import {MatFormFieldModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { SigninComponent } from './signin/signin.component';
import { BookscontainerComponent } from './bookscontainer/bookscontainer.component';
import {Routes, RouterModule} from "@angular/router";
import {MatSidenavModule} from '@angular/material';
import { InfoOneComponent } from './info-one/info-one.component';
import { InfoTwoComponent } from './info-two/info-two.component';
import { FooterComponent } from './footer/footer.component';
import {MatProgressBarModule} from '@angular/material';

const appRoutes: Routes = [
  { path: 'bookscontainer', component: BookscontainerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookscontainerComponent,
    InfoOneComponent,
    InfoTwoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes),
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
