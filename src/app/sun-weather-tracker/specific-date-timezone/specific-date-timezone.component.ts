import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherSunService } from '../../weather-sun.service';

@Component({
  selector: 'app-specific-date-timezone',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt-20">
      <div class="flex flex-row justify-center gap-70">
      <h1 class="font-bold text-2xl p-2 pt-10  flex justify-center items-center text-white uppercase">Sun-Weather Tracker</h1>

<label class="inline-flex items-center cursor-pointer" (click)="toggleme()" >
  <input type="checkbox" value="" class="sr-only peer">
  <div (click)="toggleme()" class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
</label>

      </div>
      
      <div class="flex gap-4 justify-center p-8">
        <input type="text" [(ngModel)]="location" (keydown.enter)="getSpecificDateTimezone()" #locationInput class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-80 p-2.5" placeholder="Enter a location" autofocus required />
        <input type="date" [(ngModel)]="date" (keydown.enter)="getSpecificDateTimezone()"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-80 p-2.5" placeholder="Enter a date"  required />
        <input type="date" *ngIf="showDateInput" [(ngModel)]="date1" (keydown.enter)="getSpeciicTimezone1()"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-80 p-2.5" placeholder="Enter a date"  required />
      </div>

      <div *ngIf="error" >
        <span class="text-red-500">*{{ error }}</span>
      </div>
      <!-- *ngIf="specificDate" -->
      <div *ngIf="specificDate && specificDate.length > 0" class="flex justify-center  items-center flex-col bg-gray-400 w-full max-w-2xl h-full p-4 rounded-md mx-auto ">
  <div class="h-96 overflow-y-scroll">
  <div class="" *ngFor="let dateRanges of specificDate" class="">
      <!-- <h2 class="text-center  text-gray-600">Sunrise and Sunset Data:</h2> -->
      <p class="text-center text-white font-bold text-xl pt-6 ">Date: {{dateRanges!.date}}</p>
      <div class="flex justify-between space-x-60">
        <div class="flex flex-col">
          <img src="sunrise.svg" alt="" class="w-40 h-20 rounded-5xl">
          <h2 class="text-center text-white font-bold">Sunrise</h2>
          <p class="text-center text-gray-600 font-medium ">{{ dateRanges!.sunrise.sunrise }}</p>
          <p class="text-center text-gray-600 font-medium ">Dawn: {{dateRanges!.dawn}}</p>
        </div>
        <div class="flex flex-col">
          <img src="sunset.svg" alt="" class="w-40 h-20 rounded-5xl">
          <h2 class="text-center text-white font-bold">Sunset</h2>
          <p class="text-center text-gray-600 font-medium ">{{ dateRanges!.sunset }}</p>
          <p class="text-center text-gray-600 font-medium">Dusk: {{dateRanges.dusk}}</p>
         
        </div>
      </div>



      <div class="bg-gray-600 pt-4 rounded-xl space-y-4 justify-between text-center text-white">
        <div class="flex flex-row">
          <p class="">First Light: {{ dateRanges!.first_light }}</p>
          <p class="">Last Light: {{ dateRanges!.last_light }}</p>
          <p class="">Day-length: {{dateRanges.day_length}}</p>
          <p class="">Time zone: {{dateRanges!.timezone}}</p>
          <p class="">Golden-Hour: {{dateRanges!.golden_hour}}</p>
        </div>
        <div *ngIf="weatherData">
          <h2 class="text-yellow-400 font-bold">Weather Data:</h2>
          <div class="flex flex-row space-x-4 p-4">
          <p class="">Temperature:</p><p class="text-yellow-300">{{ weatherData.hourly.temperature_2m[0] }}°C</p>
          <p class="">Dew Point:</p><p class="text-yellow-300"> {{ weatherData.hourly.dew_point_2m[0] }}</p>
          <p class="">Relative humidity:</p><p class="text-yellow-300"> {{ weatherData.hourly.relative_humidity_2m[0] }}</p>
          <p class="">Rain: </p><p class="text-yellow-300">{{weatherData.hourly.rain[0]}}</p>
          <p class="">Snowfall:</p><p class="text-yellow-300"> {{weatherData.hourly.snowfall[0]}}</p>
        </div>
        </div>
      </div>
      <div>
        
      </div>
      
      
      </div>
      

  </div>
      
</div>





<div *ngIf="specificDate" class="flex pt-4 justify-center items-center flex-col bg-gray-400 w-full max-w-2xl h-full p-4 rounded-md mx-auto">
      <div class="">
      <!-- <h2 class="text-center  text-gray-600">Sunrise and Sunset Data:</h2> -->
      <p class="text-center text-white font-bold text-xl ">Today: {{specificDate!.date}}</p>
      <div class="flex justify-between space-x-60">
        <div class="flex flex-col">
          <img src="sunrise.svg" alt="" class="w-40 h-20 rounded-5xl">
          <h2 class="text-center text-white font-bold">Sunrise</h2>
          <p class="text-center text-gray-600 font-medium ">{{ specificDate!.sunrise }}</p>
          <p class="text-center text-gray-600 font-medium ">Dawn: {{specificDate!.dawn}}</p>
        </div>
        <div class="flex flex-col">
          <img src="sunset.svg" alt="" class="w-40 h-20 rounded-5xl">
          <h2 class="text-center text-white font-bold">Sunset</h2>
          <p class="text-center text-gray-600 font-medium ">{{ specificDate!.sunset }}</p>
         
        </div>
      </div>
      </div>

      <div class="bg-gray-600 rounded-xl space-y-4 justify-between text-center text-white">
        <div class="flex flex-row">
          <p class="">First Light: {{ specificDate!.first_light }}</p>
          <p class="">Last Light: {{ specificDate!.last_light }}</p>
          <p class="">Day-length: {{specificDate.day_length}}</p>
          <p class="">Time zone: {{specificDate!.timezone}}</p>
          <p class="">Golden-Hour: {{specificDate!.golden_hour}}</p>
        </div>
     
        <div *ngIf="weatherData">
          <h2 class="text-yellow-400 font-bold">Weather Data:</h2>
          <div class="flex flex-row space-x-4 p-4">
          <p class="">Temperature:</p><p class="text-yellow-300">{{ weatherData.hourly.temperature_2m[0] }}°C</p>
          <p class="">Dew Point:</p><p class="text-yellow-300"> {{ weatherData.hourly.dew_point_2m[0] }}</p>
          <p class="">Rain: </p><p class="text-yellow-300">{{weatherData.hourly.rain[0]}}</p>
          <!-- <p class="">Shower:</p><p class="text-yellow-300"> {{weatherData.hourly.showers[0]}}</p> -->
          <p class="">Snowfall:</p><p class="text-yellow-300"> {{weatherData.hourly.snowfall[0]}}</p>
        </div>
        </div>
        </div>
     
      <div>
        
      </div>
      
      
      </div>
    

    </div>
  `,
  
})
export class SpecificDateTimezoneComponent implements AfterViewInit {
  location: string = '';
  date: string=''; 
  date1:string='';
  error: string = '';
  specificDate: any = null;
  weatherData: any = null;
  
  showDateInput=false;
toggleInput=false;
  // date_start:string='';
  // date_end:string='';
  specifiedDate:any;
  

  @ViewChild('locationInput') locationInput: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.locationInput?.nativeElement.focus();
      
  }

 toggleme(){
  this.showDateInput = !this.showDateInput;
}



 



  sunrise: string = '';
  sunset: string = '';

  constructor(private apiService: WeatherSunService) {
    // const storedSunData = localStorage.getItem('specificDate');
    // const storedWeatherData = localStorage.getItem('weatherData');
    this.date = new Date().toISOString().split('T')[0]; 
     const storedLocationData = localStorage.getItem('location');

    // if(storedSunData){
    //   this.specificDate = JSON.parse(storedSunData);
    // }
    // if(storedWeatherData){
    //   this.weatherData = JSON.parse(storedWeatherData);
    // }
    if(storedLocationData){
      this.location = JSON.parse(storedLocationData)
    }
  }
  


  



  getSpecificDateTimezone() {
   
    if (!this.location || !this.date) {
      this.error = 'Please enter a location and date.';
      return;
    }
    this.error = '';

    const formattedDate = new Date(this.date).toISOString().split('T')[0]; 

    this.apiService.fetchCoordinatesForSpecificDate(this.location, formattedDate).then(({ latitude, longitude, date }) => {
      localStorage.setItem('location',JSON.stringify(this.location));
      console.log('Coordinates:', latitude, longitude, date);

     
      this.apiService.fetchSpecificDate(latitude, longitude, formattedDate).then(response => {
        this.specificDate = response;
        //localStorage.setItem('specificDate',JSON.stringify(this.specificDate));
        console.log('From specific date: ', this.specificDate);
      }).catch(err => {
        this.error = 'Failed to fetch sunrise/sunset data.';
        console.log('Error fetching sunrise/sunset data:', err);
      });

     
      this.apiService.fetchSpecificWeatherData(latitude, longitude, date).then(data => {
        this.weatherData = data;
        localStorage.setItem('weatherData', JSON.stringify(this.weatherData))
        console.log('Weather Data: ', this.weatherData);
      }).catch(err => {
        this.error = 'Failed to fetch weather data.';
        console.log('Error fetching weather data:', err);
      });
    }).catch(error => {
      this.error = 'Location not found or invalid.';
      console.log('Error fetching coordinates:', error);
    });


  }


  getSpeciicTimezone1() {
    if (!this.location || !this.date || !this.date1) {
      this.error = 'Please enter location and start date, end date';
      return;
    }
  
    this.error = '';
  
    const startFormattedDate = new Date(this.date).toISOString().split('T')[0];
    const endFormattedDate = new Date(this.date1).toISOString().split('T')[0];
  
    this.apiService.fetchCoordinatesForDateRange(this.location, startFormattedDate, endFormattedDate).then(({latitude, longitude, date_start, date_end}) => {
      localStorage.setItem('location',JSON.stringify(this.location))
      console.log("Coordinates:", latitude, longitude, date_start, date_end);
  
      this.apiService.fetchDateRangeSunriseSunset(latitude, longitude, startFormattedDate, endFormattedDate).then(response => {
        
        //localStorage.setItem('dateRange',JSON.stringify(this.dateRange));
        console.log("API Response:", response);  
        if (response && response.dateRangeSunrise) {
          this.specificDate = response.dateRangeSunrise; 
          
          console.log("Date Range after assignment:", this.specificDate);  
        } else {
          this.specificDate = [];
          this.error = 'No data found for the selected range.';
        }
      }).catch(err => {
        this.error = 'Failed to fetch sunrise/sunset data.';
        console.log("Error fetching sunrise/sunset data:", err);
      });

      this.apiService.fetchDateRangeWeather(latitude, longitude, date_start, date_end).then(data => {
        this.weatherData = data;
        console.log('Weather Data from ts: ', this.weatherData);
        return this.weatherData;
        
        //localStorage.setItem('weatherData', JSON.stringify(this.weather))
      
      }).catch(err => {
        this.error = 'Failed to fetch weather data.';
        console.log('Error fetching weather data:', err);
      });
    }).catch(error => {
      this.error = 'Location not found or invalid.';
      console.log('Error fetching coordinates:', error);
  
    });
  }
  






  
}
