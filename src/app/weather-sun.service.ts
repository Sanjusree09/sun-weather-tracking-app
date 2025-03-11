import { Injectable } from '@angular/core';
import axios from 'axios';
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class WeatherSunService {
  private apiKey = 'eae34418668a4f7fa82221b257549bec';

  constructor() { }
  


  //Specific date-timezone
  
  fetchSpecificDate(latitude: number, longitude: number, date: string) {
    return axios.get(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date=${date}`)
    
      .then((response) => {
        // const {token} = response.data;
        // localStorage.setItem('authToken',token)
        // return response.data.results; 
        const utcSunrise = response.data.results.sunrise;
        const utcSunset = response.data.results.sunset;
        const utcDate = response.data.results.date;
        const utcFirstLight = response.data.results.first_light;
        const utcLastLight = response.data.results.last_light;
        const utcDawn = response.data.results.dawn;
        const utcDusk = response.data.results.dusk;
        const utcDayLength = response.data.results.day_length;
       // const utcTimeZone = response.data.results.timezone;
        const utcGoldenHour = response.data.results.golden_hour;
  
        // Convert UTC time to IST (Asia/Kolkata)
        const sunriseInIST = moment.utc(utcSunrise, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const sunsetInIST = moment.utc(utcSunset, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const dateInIST = moment.utc(utcDate ).tz('Asia/Kolkata').format('YYYY-MM-DD');
        const firstLightInIST = moment.utc(utcFirstLight, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const lastLightInIST = moment.utc(utcLastLight, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const dawnInIST = moment.utc(utcDawn, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const duskInIST = moment.utc(utcDusk, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        const dayLengthinIST = moment.utc(utcDayLength, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
        //const timeZoneInIST = moment.utc(utcTimeZone).tz('Asia/Kolkata')
        const goldenHourInIST = moment.utc(utcGoldenHour, "hh:mm:ss a").tz('Asia/Kolkata').format('HH:mm:ss A');
      
  
        return {
          date:dateInIST,
          sunrise: sunriseInIST,
          sunset: sunsetInIST,
          first_light: firstLightInIST,
          last_light: lastLightInIST,
          dawn:dawnInIST,
          dusk:duskInIST,
          day_length:dayLengthinIST,
         // timezone:timeZoneInIST,
          golden_hour:goldenHourInIST
        };
      })
      .catch((error) => {
        console.error("Error fetching specific date data:", error);
        throw error;
      });
  }

  fetchSpecificWeatherData(latitude: number, longitude: number, date: string) {
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,showers,snowfall&start_date=${date}&end_date=${date}`)
      .then((response) => {
       
        return response.data; 
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        throw error;
      });
  }

  fetchCoordinatesForSpecificDate(location: string, date: string) {
    const encodedLocation = encodeURIComponent(location);
    
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${this.apiKey}`)
      .then((response) => {
        if (response.data.results && response.data.results.length > 0) {
          const latitude = response.data.results[0].geometry.lat;
          const longitude = response.data.results[0].geometry.lng;
          return { latitude, longitude, date }; 
        } else {
          throw new Error('Location not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
        throw error;
      });
  }


  //date-range-request


  fetchDateRangeSunriseSunset(latitude:number, longitude:number, date_start:string, date_end: string){
    return axios.get(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date_start=${date_start}&date_end=${date_end}`)
    .then((response)=>{
      const dateRangeSunrise = response.data.results;
      console.log("Date Range from service",dateRangeSunrise);
      return {dateRangeSunrise}
    })
  }

  fetchDateRangeWeather(latitude: number, longitude: number, date_start: string, date_end:string) {
    // return axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date_start}&end_date=${date_end}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,snowfall`)
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,showers,snowfall&start_date=${date_start}&end_date=${date_end}`)
      .then((response) => {
       
        return response.data; 
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        throw error;
      });
  }

  fetchCoordinatesForDateRange(location: string, date_start: string, date_end: string) {
    const encodedLocation = encodeURIComponent(location);
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${this.apiKey}`)
      .then((response) => {
        console.log(response,'response')
        if (response.data.results && response.data.results.length > 0) {
          const latitude = response.data.results[0].geometry.lat;
          const longitude = response.data.results[0].geometry.lng;
          return { latitude, longitude, date_start, date_end }; 
        } else {
          throw new Error('Location not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
        throw error;
      });
  }

 



}
//https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,showers,snowfall&start_date=${date_start}&end_date=${date_end}

