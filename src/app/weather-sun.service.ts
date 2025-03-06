import { Injectable } from '@angular/core';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class WeatherSunService {
  private apiKey = 'eae34418668a4f7fa82221b257549bec';

  constructor() { }

  
  fetchSunData(latitude: number, longitude: number) {
    return axios.get(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`)
      .then(response => {
        const responses =  response.data.results; 
        console.log("Responses from fetch sun data:",responses);
        return responses;
      })
      .catch(error => {
        console.error('Error fetching sunrise/sunset data:', error);
        throw error;
      });
  }


  fetchWeatherData(latitude: number, longitude: number) {
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,showers,snowfall`)
      .then(response => {
        return response.data; 
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        throw error;
      });
  }

  
  fetchCoordinates(location: string) {
    const encodedLocation = encodeURIComponent(location);
    return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${this.apiKey}`)
    
      .then(response => {
        if (response.data.results && response.data.results.length > 0) {
          const latitude = response.data.results[0].geometry.lat;
          const longitude = response.data.results[0].geometry.lng;
          return { latitude, longitude }; 
        } else {
          throw new Error('Location not found');
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        throw error;
      });
  }

  //Specific date-timezone
  
  fetchSpecificDate(latitude: number, longitude: number, date: string) {
    return axios.get(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date=${date}`)
    
      .then((response) => {
        const {token} = response.data;
        localStorage.setItem('authToken',token)
        return response.data.results; 
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
    return axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date_start}&end_date=${date_end}&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,rain,snowfall`)
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

