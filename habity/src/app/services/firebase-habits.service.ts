import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Habit } from './habit.model';

interface CalendarData {
  habits: { id: string; done: boolean }[];
  // inne pola, jeśli istnieją
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseHabitsService {

  constructor(private firestore: AngularFirestore,
    private authService: AuthService) { }





  getHabitsForDay(date: string): Observable<Habit[]> {
    return this.authService.getLoggedInUserId().pipe(
      switchMap(uid => {
        if (uid) {
          return this.firestore.doc<CalendarData>(`users/${uid}/calendar/${date}`).valueChanges().pipe(
            switchMap(calendarData => {
              const habitIds = calendarData?.habits?.map(h => h.id) || [];

              const habitDocs = habitIds.map(id => this.firestore.doc(`users/${uid}/habits/${id}`).valueChanges());
              return combineLatest(habitDocs).pipe(
                map(habitDataArray => {
                  return habitDataArray.map((habitData: any, index: number) => {
                    console.log(habitData, calendarData?.habits[index])
                    if (habitData && calendarData?.habits && calendarData?.habits[index]) {
                      return {
                        ...habitData,
                        ...calendarData?.habits[index]
                      };
                    }
                    return {};
                  });
                })
              );
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }


}
