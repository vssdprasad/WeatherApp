import { httpService } from "../Api";

//Geocode API to get the city list by search
export const getCityId = (userData) => {
    return httpService.get(`geo/1.0/direct?q=`+ userData +`&limit=10&appid=1635890035cbba097fd5c26c8ea672a1`);
  }


export const getWeatherData = (userData) => {
    return httpService.get(`data/2.5/forecast?q=`+ userData?.cityname +`&appid=1635890035cbba097fd5c26c8ea672a1&units=metric`)
}