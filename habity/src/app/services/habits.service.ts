import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { FirebaseHabitsService } from './firebase-habits.service';
import { Habit } from './habit.model';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {


  habits: Habit[] = [
    { id: 'x14', displayName: 'Do at least 10 push ups', points: 5, done: false },
    { id: 'x15', displayName: 'Drink Water', points: 20, done: false },
    { id: 'x16', displayName: 'Run', points: 20, done: false },
    { id: 'x17', displayName: 'Reading', points: 50, done: false },
    { id: 'x18', displayName: 'Walking', points: 5, done: false },
  ]

  constructor(private firebaseHabitsService: FirebaseHabitsService) {
    this.firebaseHabitsService.getHabitsForDay('2023-09-14').subscribe((data) => {
      this.habits = data.habits
      console.log(this.habits)
    })
  }

  getHabits(): Observable<Habit[]> {
    return of(this.habits)
  }






  evaluatePercentage() {

    let done = 0
    this.habits.forEach(habit => {
      if (habit.done) {
        done = done + habit.points
      }
    })
    return done
  }



}
