import React, { useState } from 'react'
import './WeatherApp.css'
import { NewtonsCradle } from '@uiball/loaders'
import search_icone from '../Assets/search.png'
import clear_icone from '../Assets/clear.png'
import cloud_icone from '../Assets/cloud.png'
import drizzle_icone from '../Assets/drizzle.png'
import rain_icone from '../Assets/rain.png'
import snow_icone from '../Assets/snow.png'
import wind_icone from '../Assets/wind.png'
import humidity_icone from '../Assets/humidity.png'
const WeatherApp = () => {

    let api_key = "e112917c7c6ae9f4e53af504372d787c"
    const [wicon, setWicon] = useState(cloud_icone)
    const [loading, setLoading] = useState(false)
    const search = async () => {
        const element = document.getElementsByClassName('cityInput')
        if (element[0].value === "") {
            return 0;
        }
        setLoading(true);
        
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
            const responce = await fetch(url)
            let data = await responce.json()
            console.log(data);
            const humidity = document.getElementsByClassName('humidity-percent')
            const wind = document.getElementsByClassName('wind-rate')
            const temperature = document.getElementsByClassName('weather-temp')
            const location = document.getElementsByClassName('weather-location')

            humidity[0].innerHTML = data.main.humidity + "%";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " Km/H";
            temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
            location[0].innerHTML = data.name;

            if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWicon(clear_icone)
            }
            else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
                setWicon(cloud_icone)
            }
            else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
                setWicon(drizzle_icone)
            }
            else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
                setWicon(drizzle_icone)
            }
            else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
                setWicon(rain_icone)
            }
            else if (data.weather[0].icon === '010d' || data.weather[0].icon === '010n') {
                setWicon(rain_icone)
            }
            else if (data.weather[0].icon === '013d' || data.weather[0].icon === '013n') {
                setWicon(snow_icone)
            }
            else {
                setWicon(clear_icone)
            }
      
    }

    return (
        <div className="all">
            {loading ? (
        <NewtonsCradle size={40} speed={1.4} color="white" />
      ):(
           <div></div>
            )}
             <div className="container">
                <div className="top-bar">

                    <input type="text" className="cityInput" placeholder='Search' />
                    <div className="search-icon" onClick={() => { search() }}>
                        <img src={search_icone} alt="" />
                    </div>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="" />
                </div>
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icone} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">
                                64%
                            </div>
                            <div className="text">
                                Humidity
                            </div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icone} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-rate">
                                18 km/h
                            </div>
                            <div className="text">
                                Wind Speed
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp
