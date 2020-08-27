import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private api: ApiService) { }

  @Input()
  email: string;
  @Input()
  password: string;

  ngOnInit(): void {
  }

  login(){
    this.auth.login(this.email, this.password)
  }
  
  register(){
    this.auth.register(this.email, this.password)
      .then(() => {
        this.api.postUser(this.auth.user.uid, this.email, 0)
        console.log(`Registered user ${this.auth.user.email} with uid ${this.auth.user.uid}`)
      })
  }
}
