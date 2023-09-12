import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  backgroundSrcs = ['../assets/images/boats.jpg',
    '../assets/images/fiji.jpg',
    '../assets/images/mountains.jpg'];
  currentBackgroundID = 0

  @ViewChild('container') container: ElementRef

  constructor(public authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngAfterViewInit(): void {
    const number = Math.floor(Math.random() * 3);

    this.container.nativeElement.style.backgroundImage = `url(${this.backgroundSrcs[number]})`;
  }






}
