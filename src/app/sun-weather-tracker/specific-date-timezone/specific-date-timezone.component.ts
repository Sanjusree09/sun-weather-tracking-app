import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { WeatherSunService } from '../../weather-sun.service';
import moment from 'moment-timezone';




@Component({
  selector: 'app-specific-date-timezone',
  imports: [CommonModule, FormsModule],
  template: `
  
  <div class="pt-20">
  
  <div class="flex flex-row sm:flex-row sm:justify-center justify-center gap-8 sm:px-0">
    <h1 class="font-bold text-2xl sm:text-3xl p-2 flex justify-center items-center text-white uppercase">Sun-Weather Tracker</h1>

    <label class="inline-flex items-center cursor-pointer" (click)="toggleme()">
      <input type="checkbox" value="" class="sr-only peer">
      <div (click)="toggleme()" class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span class="ps-3 text-sm font-medium text-gray-900 dark:text-gray-300">Date Range</span>
    </label>
  </div>

  
  <div class="flex flex-col sm:flex-row gap-4 justify-center p-8 sm:p-12">
    <input type="text" [(ngModel)]="location"  #locationInput class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:w-80 p-2.5" placeholder="Enter a location" autofocus required />

    <input *ngIf="showDateInput" type="date" [(ngModel)]="date" (keydown.enter)="getSpecificDateTimezone()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:w-80 p-2.5" placeholder="Enter a date" required />
    <input *ngIf="!showDateInput" type="date" [(ngModel)]="date1"  (keydown.enter)="getSpeciicTimezone1()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:w-80 p-2.5" placeholder="Start Date"  required />
    <input *ngIf="!showDateInput" type="date" [(ngModel)]="date2" (keydown.enter)="getSpeciicTimezone1()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full sm:w-80 p-2.5" placeholder="End Date" required />
  </div>


  <div *ngIf="error">
    <span class="text-red-500">*{{ error }}</span>
  </div>

 
  <div *ngIf="specificDateRange && specificDateRange.length > 0 && showUI2" class="flex justify-center items-center flex-col bg-gray-400 xs:bg-blue-300 w-full max-w-2xl h-full p-4 rounded-md mx-auto sm:bg-gray-400">
  <div class="h-96 overflow-y-scroll">
    <div *ngFor="let dateRanges of specificDateRange">
      <p class="text-center text-white font-bold text-xl p-6">Date: {{dateRanges!.date}}</p>
      

      <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16">
       
        <div class="flex flex-col items-center">
          <img src="sunrise.svg" alt="" class="w-40 h-20 flex justify-center">
          <h2 class="text-center text-white font-bold">Sunrise</h2>
          <p class="text-center text-gray-600 font-medium">{{ dateRanges!.sunrise }}</p>
          <p class="text-center text-gray-600 font-medium pb-2">Dawn: {{dateRanges!.dawn}}</p>
        </div>

        <div class="flex flex-col items-center">
          <img src="sunset.svg" alt="" class="w-40 h-20 rounded-5xl">
          <h2 class="text-center text-white font-bold">Sunset</h2>
          <p class="text-center text-gray-600 font-medium">{{ dateRanges!.sunset }}</p>
          <p class="text-center text-gray-600 font-medium pb-2">Dusk: {{dateRanges.dusk}}</p>
        </div>
      </div>

   
      <div class="bg-gray-600 p-6 rounded-xl space-y-4 justify-between text-center text-white">
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <p class="">First Light: {{ dateRanges!.first_light }}</p>
          <p class="">Last Light: {{ dateRanges!.last_light }}</p>
          <p class="">Day-length: {{dateRanges.day_length}}</p>
          <p class="">Time zone: {{dateRanges!.timezone}}</p>
          <p class="">Golden-Hour: {{dateRanges!.golden_hour}}</p>
        </div>

    
        <div *ngIf="weatherData">
          <h2 class="text-yellow-400 font-bold">Weather Data:</h2>
          <div class="flex flex-col sm:flex-row space-x-4 p-4">
            <p class="">Temperature:</p><p class="text-yellow-300">{{ weatherData.hourly.temperature_2m[0] }}°C</p>
            <p class="">Dew Point:</p><p class="text-yellow-300"> {{ weatherData.hourly.dew_point_2m[0] }}</p>
            <p class="">Relative humidity:</p><p class="text-yellow-300"> {{ weatherData.hourly.relative_humidity_2m[0] }}</p>
            <p class="">Rain: </p><p class="text-yellow-300">{{weatherData.hourly.rain[0]}}</p>
            <p class="">Snowfall:</p><p class="text-yellow-300"> {{weatherData.hourly.snowfall[0]}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  <div *ngIf="specificDate" [ngClass]="{'hidden': showUI2}" class="flex pt-4 justify-center items-center flex-col bg-gray-400 w-full max-w-2xl h-full p-4 rounded-md mx-auto sm:bg-gray-400 xs:bg-blue-300">
  <div>
    <p class="text-center text-white font-bold text-xl p-6">Today: {{specificDate!.date}}</p>


    <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-16">
     
      <div class="flex flex-col items-center mb-4 sm:mb-0">
        <img src="sunrise.svg" alt="" class="w-40 h-20 rounded-5xl">
        <h2 class="text-center text-white font-bold">Sunrise</h2>
        <p class="text-center text-gray-600 font-medium">{{ specificDate!.sunrise }}</p>
        <p class="text-center text-gray-600 font-medium pb-2">Dawn: {{specificDate!.dawn}}</p>
      </div>

     
      <div class="flex flex-col items-center mb-4 sm:mb-0">
        <img src="sunset.svg" alt="" class="w-40 h-20 rounded-5xl">
        <h2 class="text-center text-white font-bold">Sunset</h2>
        <p class="text-center text-gray-600 font-medium">{{ specificDate!.sunset }}</p>
        <p class="text-center text-gray-600 font-medium pb-2">Dusk: {{ specificDate!.dusk }}</p>
      </div>
    </div>
  </div>

  <div class="bg-gray-600 rounded-xl p-6 space-y-4 justify-between text-center text-white">
    
    <div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
      <p class="">First Light: {{ specificDate!.first_light }}</p>
      <p class="">Last Light: {{ specificDate!.last_light }}</p>
      <p class="">Day-length: {{specificDate.day_length}}</p>
      <p class="">Golden-Hour: {{specificDate!.golden_hour}}</p>
    </div>


    <div *ngIf="weatherData">
      <h2 class="text-yellow-400 font-bold">Weather Data:</h2>
      <div class="flex flex-col sm:flex-row space-x-4 p-4">
        <p class="">Temperature:</p><p class="text-yellow-300">{{ weatherData.hourly.temperature_2m[0] }}°C</p>
        <p class="">Dew Point:</p><p class="text-yellow-300"> {{ weatherData.hourly.dew_point_2m[0] }}</p>
        <p class="">Rain:</p><p class="text-yellow-300">{{weatherData.hourly.rain[0]}}</p>
        <p class="">Snowfall:</p><p class="text-yellow-300"> {{weatherData.hourly.snowfall[0]}}</p>
      </div>
    </div>
  </div>
</div>
<div>

  `,
  
})
export class SpecificDateTimezoneComponent implements AfterViewInit {
  location: string = '';
  locationDateRange: string = '';
  dateRangeDate1:string='';
  dateRangeDate2:string='';
  date: string ='';
  date1: string  | null = null;
  date2: string | null = null;
  error: string = '';
  specificDate: any = null; 
  weatherData: any = null;
  specificDateRange: any = null; 
  weather: any = null;

  showDateInput = true;
  showUI2 = false;
 
  istTimestamp: string | undefined;

  sunrise:string='';
  sunset:string='';
  
  

  @ViewChild('locationInput') locationInput: ElementRef | undefined;
  

  ngAfterViewInit(): void {
    this.locationInput?.nativeElement.focus();
  
  }

 

  toggleme() {
   
    this.showDateInput = !this.showDateInput;
    this.showUI2 = !this.showUI2;
    
    if (this.showUI2) {
      
      if (!this.specificDateRange && !this.weather) {
        this.getSpeciicTimezone1(); 
      }
    } else {
    
      if (!this.specificDate && !this.weatherData) {
        this.getSpecificDateTimezone(); 
      }
    }
  }


  constructor(private apiService: WeatherSunService) {
    const storedSunData = localStorage.getItem('specificDate');
    const storedWeatherData = localStorage.getItem('weatherData');
    const storedLocationData = localStorage.getItem('location');
    
    // Date Range - open meteo
    const storedDateRangeLocationData = localStorage.getItem('locationDateRange');
    const storedDateRangeDate1 = localStorage.getItem('dateRangeDate1');
    const storedDateRangeDate2 = localStorage.getItem('dateRangeDate2');
    const storedDateRangeSunData = localStorage.getItem('specificDateRange');
    const storedDateRangeWeatherData = localStorage.getItem('weather');
  
    if (storedSunData) {
      this.specificDate = JSON.parse(storedSunData);
    }
    if (storedWeatherData) {
      this.weatherData = JSON.parse(storedWeatherData);
    }
    if (storedLocationData) {
      this.location = JSON.parse(storedLocationData);
    }
    if (storedDateRangeSunData) {
      this.specificDateRange = JSON.parse(storedDateRangeSunData);
    }
    if (storedDateRangeWeatherData) {
      this.weather = JSON.parse(storedDateRangeWeatherData);
    }
    if (storedDateRangeLocationData) {
      this.locationDateRange = JSON.parse(storedDateRangeLocationData);
    }
  
    // Retrieve date1 and date2 from localStorage
    const storedDate1 = localStorage.getItem('date1');
    const storedDate2 = localStorage.getItem('date2');
  
    if (storedDate1) {
      this.date1 = JSON.parse(storedDate1);
    }
  
    if (storedDate2) {
      this.date2 = JSON.parse(storedDate2);
    }
  
    this.date = new Date().toISOString().split('T')[0];
    this.date1 = this.date1 || new Date().toISOString().split('T')[0];
    this.date2 = this.date2 || new Date().toISOString().split('T')[0];
  }
  

  getSpecificDateTimezone() {
    if (!this.location || !this.date) {
      this.error = 'Please enter a location and date.';
      return;
    }

  
    // if (this.specificDate && this.weatherData) {
    //   return;
    // }

    this.error = '';
    const formattedDate = new Date(this.date).toISOString().split('T')[0];

    this.apiService.fetchCoordinatesForSpecificDate(this.location, formattedDate).then(
      ({ latitude, longitude, date }) => {
        localStorage.setItem('location', JSON.stringify(this.location));
       
        


        this.apiService.fetchSpecificDate(latitude, longitude, formattedDate).then(
          (response) => {
            this.specificDate = response;
            localStorage.setItem('specificDate', JSON.stringify(this.specificDate)); 
           
            const utcToIst = moment().tz("Asia/kolkatta").format();
            console.log("Conversion of UTC to IST:",utcToIst)
            const time = this.specificDate.results.sunrise;
            console.log("Time:",time)
            
           
            console.log("IST converted time from ts:",)
            
          },
          (err) => {
            this.error = 'Failed to fetch sunrise/sunset data.';
            console.log('Error fetching sunrise/sunset data:', err);
          }
        );

       
     
    
        this.apiService.fetchSpecificWeatherData(latitude, longitude, date).then(
          (data) => {
            this.weatherData = data;
            localStorage.setItem('weatherData', JSON.stringify(this.weatherData)); 
          },
          (err) => {
            //this.error = 'Failed to fetch weather data.';
            console.log('Error fetching weather data:', err);
          }
        );
      },
      (error) => {
        this.error = 'Location not found or invalid.';
        console.log('Error fetching coordinates:', error);
      }
    );
  }

  
  


  getSpeciicTimezone1() {
    if (!this.location || !this.date1 || !this.date2) {
      this.error = 'Please enter location, start date, and end date';
      return;
    }
   
  
    this.error = '';
    const startFormattedDate = new Date(this.date1).toISOString().split('T')[0];
    const endFormattedDate = new Date(this.date2).toISOString().split('T')[0];
  
  
    console.log('Start Date:', startFormattedDate);
    console.log('End Date:', endFormattedDate);
  
    this.apiService.fetchCoordinatesForDateRange(this.location, startFormattedDate, endFormattedDate).then(
      ({ latitude, longitude, date_start, date_end }) => {
        localStorage.setItem('locationDateRange', JSON.stringify(this.location)); 
        localStorage.setItem('date1', JSON.stringify(this.date1));
        localStorage.setItem('date2',JSON.stringify(this.date2));
  
        console.log('Coordinates fetched:', latitude, longitude);
  
        this.apiService.fetchDateRangeSunriseSunset(latitude, longitude, startFormattedDate, endFormattedDate).then(
          (response) => {
            if (response && response.dateRangeSunrise) {
              this.specificDateRange = response.dateRangeSunrise;
              localStorage.setItem('specificDateRange', JSON.stringify(this.specificDateRange)); 
              console.log('Date Range Sunrise/Sunset:', this.specificDateRange);
            } else {
              this.specificDateRange = [];
              this.error = 'No data found for the selected range.';
              console.log('No date range data found.');
            }
          },
          (err) => {
            this.error = 'Failed to fetch sunrise/sunset data.';
            console.log('Error fetching sunrise/sunset data:', err);
          }
        );
  
        this.apiService.fetchDateRangeWeather(latitude, longitude, date_start, date_end).then(
          (data) => {
            this.weather = data;
            localStorage.setItem('weather', JSON.stringify(this.weather)); 
            console.log('Weather Data:', this.weather);
          },
          (err) => {
            //this.error = 'Failed to fetch weather data.';
            console.log('Error fetching weather data:', err);
          }
        );
      },
      (error) => {
        this.error = 'Location not found or invalid.';
        console.log('Error fetching coordinates:', error);
      }
    );
  }
}  


