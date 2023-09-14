import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseHabitsService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }



  getHabitsForDay(date: string): Observable<any> {
    return this.authService.getLoggedInUserId().pipe(
      switchMap(uid => {
        if (uid) {
          return this.firestore.doc(`users/${uid}/calendar/${date}`).valueChanges()
          // .pipe(
          //   map(data => data as any[]), // Przekształć typ danych na any[]
          // );
        } else {
          // Obsłuż przypadki, gdy użytkownik nie jest zalogowany
          return of([]); // Możesz zwrócić pustą tablicę lub inny odpowiedni stan
        }
      })
    );
  }
}
