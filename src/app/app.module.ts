import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {ServerService} from '../server.service';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule, MatGridListModule, MatIconModule, MatInputModule,
  MatToolbarModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {BookscontainerComponent} from './bookscontainer/bookscontainer.component';
import {Routes, RouterModule} from "@angular/router";
import {MatSidenavModule} from '@angular/material';
import {InfoOneComponent} from './info-one/info-one.component';
import {InfoTwoComponent} from './info-two/info-two.component';
import {FooterComponent} from './footer/footer.component';
import {MatProgressBarModule} from '@angular/material';
import {HomePageComponent} from './home-page/home-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent},
  { path: 'bookscontainer', component: BookscontainerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookscontainerComponent,
    InfoOneComponent,
    InfoTwoComponent,
    FooterComponent,
    HomePageComponent,
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
    MatProgressBarModule,
    MatAutocompleteModule,
    NgbModule.forRoot()
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
