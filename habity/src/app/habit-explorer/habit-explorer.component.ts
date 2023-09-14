import { Component } from '@angular/core';
import { HabitsService } from '../services/habits.service';

@Component({
  selector: 'app-habit-explorer',
  templateUrl: './habit-explorer.component.html',
  styleUrls: ['./habit-explorer.component.scss']
})
export class HabitExplorerComponent {

  habits = []

  constructor(private habitsService: HabitsService) {

  }

  ngOnInit(): void {
    this.habitsService.getHabits().subscribe((data) => {
      this.habits = data
      console.log(data)
    })
  }

  toggleDone(habit) {
    habit.done = !habit.done;
  }





}
