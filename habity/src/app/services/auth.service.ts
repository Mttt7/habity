import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Observable, map, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from './user.model';

import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  posts = []

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private afs: AngularFirestore, // Inject Firestore service
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        // Logged out
        else {
          return of(null);
        }
      })
    )
  }

  getLoggedInUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(map((user: User | null) => {
      return user ? user.uid : null;
    }));
  }

  async googleSignin() {

    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    //this.router.navigate(['/dashboard']);
    return this.updateUserData(credential.user);

  }

  async signOut() {

    console.log('logging out')
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }



  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }



}