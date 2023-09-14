import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoicQuotesService } from '../services/stoic-quotes.service';
import { HabitExplorerComponent } from '../habit-explorer/habit-explorer.component';
import { HabitsService } from '../services/habits.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {



  quote: String = '';
  author: String = '';




  constructor(public authService: AuthService, public stoicQuotes: StoicQuotesService,
    public habitsService: HabitsService) { }

  ngOnInit(): void {
    this.stoicQuotes.getRandomQuote().subscribe((data) => {
      console.log(data[0])
      this.quote = data[0].quote;
      this.author = data[0].author;
      console.log(this.quote, this.author)
    });

  }




}
