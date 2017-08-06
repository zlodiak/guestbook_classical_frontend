import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { MessagesService } from './services/messages.service';

import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    OrderModule,
  	HttpModule,
  	FormsModule,
    BrowserModule
  ],
  providers: [MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
