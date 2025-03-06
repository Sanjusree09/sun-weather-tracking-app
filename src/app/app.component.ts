import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet],
  template: `

<div class="bg-blue-950 w-screen h-screen">
  <div class="flex flex-row gap-6 float-right p-4">
    <div *ngFor="let header of navHeader">
      <!-- <button class="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer" 
              (click)="onSubmit(header)">
        {{header}}
      </button> -->
    </div>
  </div>
   
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sun-weather-tracking-app';

  navHeader: string[] = [
    'Standarad',
    'Specified date and timezone',
   
   'Date range request',
    'Returning 24-hour timestamps'
  ];

  constructor(private router: Router) {
    this.router.navigate(['/specific-date-TimeZone']);
  }

  // onSubmit(header: string) {
  //   switch(header) {
  //     case 'Standarad':
  //       this.router.navigate(['/sunrise-sunset']);
  //       break;
  //     case 'Specified date and timezone':
  //       this.router.navigate(['/specific-date-TimeZone']);
  //       break;
  //     case 'Date range request':
  //       this.router.navigate(['/date-range']);
  //       break;
  //     case 'Returning 24-hour timestamps':
  //       this.router.navigate(['/timestamps']);
  //       break;
  //     default:
  //       this.router.navigate(['/specific-date-TimeZone']);
  //   }
  // }


}
