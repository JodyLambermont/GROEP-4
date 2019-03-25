import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  //Login function
  //If the function goes through, the user will log in,
  //firebase will store the authentication object in localStorage
  //and the function will return a UserCredential object to a promise.
  loginUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //Sign-up function
  //Send data manually to firebase (otherwise data is saved locally)
  //After succesful registration, the user will be automatically logged in (no redirection to login needed)
  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((newUserCredential: firebase.auth.UserCredential) => {
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({ email });
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      });
  }

  //Reset password function
  //void promise for expansion, if further actions needed (currently none implemented)
  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  //Logout function
  //void promise so it would be possible to redirect to login page
  logoutUser(): Promise<void> {
    return firebase.auth().signOut();
  }
}
