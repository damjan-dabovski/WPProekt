import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { ApiService } from './services/api.service';
import { IgnoreHtmlSantizePipe } from './helpers/IgnoreHtmlSanitizePipe'
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailsComponent,
    PostAddEditComponent,
    IgnoreHtmlSantizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
