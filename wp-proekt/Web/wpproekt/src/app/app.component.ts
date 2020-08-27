import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService, private firebaseAuth: AngularFireAuth){
    firebaseAuth.onAuthStateChanged(user => {
      this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      this.auth.user = user
    })
  }

  title = 'wpproekt';
  get userName(){
    return this.auth.user?.email
  }

  logUser(){
    console.log(this.auth.user)
  }

  logout(){
    this.auth.logout()
  }
}
