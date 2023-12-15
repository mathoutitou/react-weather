import loader from "./assets/loader.svg"
import "./App.css"
import {useEffect, useState} from "react";
import browser from "./assets/browser.svg"

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
    const [weatherData, setWeatherData] = useState(null)
    const [errorInfo, setErrorInfo] = useState(null)

    useEffect(() => {

        fetch(`https://api.airvisual.com/v2/nearest_city?key=${API_KEY}`)
            .then(response => {
                console.log(response);
                // 400 - 499 : Client errors
                // 500 - 599 : Server errors
                if (!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData);
                setWeatherData({
                    city: responseData.data.city,
                    country: responseData.data.country,
                    iconId: responseData.data.current.weather.ic,
                    temperature: responseData.data.current.weather.tp,
                })
            })
            .catch(err => {
                setErrorInfo(err.message)
            })

    }, []);

    return (

        <main>
            <div className={`loader-container ${(!weatherData && !errorInfo) && "active"}`}>
                <img src={loader} alt="loading icon"/>
            </div>

            {weatherData && (
                <>
                    <p className="city-name">{weatherData.city}</p>
                    <p className="country-name">{weatherData.country}</p>
                    <p className="temperature">{weatherData.temperature}</p>
                    <div className="info-icon-container">
                        <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon" alt="weather icon"/>
                    </div>
                </>
            )}

            {(errorInfo && !weatherData) && (
                <>
                    <p className="error-information">
                        {errorInfo}
                    </p>
                    <img src={browser} alt="error icon"/>
                </>
            )}

        </main>

    );
}

export default App;
