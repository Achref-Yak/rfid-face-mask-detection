import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';
import { Socket } from 'ngx-socket-io';
import { UtilsService } from './utils.service';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:3000/api/tutorials';
let access: any;
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  utilsService: any;

  constructor(private http: HttpClient, private socket: Socket) {
    this.getResult();
   }



  sendMessage(){
    this.socket.emit('access','yes');
    console.log('message sent');
  }


/*
  getUser(): Observable<User> {
    return this.utilsService.get(UtilsService.apiUSER).pipe(map(res => {
      return res;
    })
  }*/

  getResult() {
    let observable = new Observable(observer => {
      this.socket.on('access', (data: any) => {
        console.log(data);
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  

   

  getAccess(){
    return access;
  }


}