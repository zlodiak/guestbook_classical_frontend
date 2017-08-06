import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class MessagesService {

	private messagesArr: any[];

  constructor(private http: Http){
  	this.messagesArr = localStorage.messages ? localStorage.messages : [];
  };

  private messages: any[] = [];

  getMessages(): Observable<any> {
    let result = this.http.get('http://localhost:8000/messages/index');
    //console.log(result);
    return result;
  };

  addMessage(obj):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); 
    let params = new URLSearchParams();

    params.set('name', obj.name.trim());
    params.set('message', obj.message.trim());
    params.set('created_date_unix', obj.created_date_unix);

    //console.log('params', params.toString());
    
    return this.http.post('http://localhost:8000/messages/create', params.toString(), { headers: headers });
  };



  

}
