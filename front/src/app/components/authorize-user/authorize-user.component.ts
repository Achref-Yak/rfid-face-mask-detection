import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-authorize-user',
  templateUrl: './authorize-user.component.html',
  styleUrls: ['./authorize-user.component.css']
})
export class AuthorizeUserComponent implements OnInit {
  
  connection : any;
  
   answer = {
    username: '',
    access:false,
  }
  constructor(private users:UsersService) { }

  ngOnInit(): void {

    this.connection = this.users.getResult().subscribe((message: any) => {
      this.answer = {username: message[0], access: message[1]};
    })

  
   
  }

}
