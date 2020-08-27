import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email,password)
      .then(response => {
        this.user = response.user
        console.log(this.user)
      })
  }

  logout(){
    this.auth.signOut()
      .then(() => {
        this.user = null
      });
  }

  register(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.user = response.user
        console.log(response)
      })
  }
}
