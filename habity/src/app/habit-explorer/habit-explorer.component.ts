import { Component } from '@angular/core';
import { FirebaseHabitsService } from '../services/firebase-habits.service';
import { Habit } from '../services/habit.model';

@Component({
  selector: 'app-habit-explorer',
  templateUrl: './habit-explorer.component.html',
  styleUrls: ['./habit-explorer.component.scss']
})
export class HabitExplorerComponent {

  habits: Habit[] = [];

  constructor(private firebaseHabitsService: FirebaseHabitsService) { }

  ngOnInit(): void {
    const date = '2023-09-14';
    this.firebaseHabitsService.getHabitsForDay(date).subscribe(habits => {
      console.log(habits)
      this.habits = Object.values(habits);

    });
  }

  toggleDone(habit) {
    habit.done = !habit.done;
  }





}
