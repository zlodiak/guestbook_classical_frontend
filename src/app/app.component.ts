import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MessagesService } from './services/messages.service';

import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private name:string = '';
  private message: string = '';
  private messages: any[] = [];

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.getMessages();
  }  

  private getMessages(): void {
    this.messagesService
        .getMessages()
        .map((response: Response) => JSON.parse(response.json()))
        .subscribe(data => {
                    this.messages = data;
                    for(let prop in this.messages) {
                      if (!this.messages.hasOwnProperty(prop)) continue;
                      this.messages[prop].fields.created_date_unix = +this.messages[prop].fields.created_date_unix;
                    }
                    
                    console.log(this.messages);
                  }, 
                  err => {
                    //console.log('err')         
                  });     
  };

  private send(name: string, message: string) {
    if(!name.trim() || !message.trim()) { 
      alert('error');
      return; 
    }

    let d = new Date();
    d.setHours(d.getHours() + 3);
    let unix_time_stamp = Math.floor(d.getTime() / 1000);


    let newMessage = {
      name: name,
      message: message,
      created_date_unix: unix_time_stamp
    }

    console.log('send', newMessage);

    let that = this;

    this.messagesService
      .addMessage(newMessage)
      .subscribe(data => {
        let res = JSON.parse(data.json());
        console.log(res);
        if(res.status == '1') {          
          that.name = '';
          that.message = '';
          that.messages.unshift({
            fields: {
              name: newMessage.name,
              text: newMessage.message,
              created_date_unix: +newMessage.created_date_unix
            }
          });
          alert("Спасибо!");
          console.log(that.messages);
        } else if(res.status == '0') {
          alert(res.error_message);
        };
      },
      err => {
        console.log('err')         
      });    

    
  };    
}
