import CurrentWeather from "./components/Current-Weather/CurrentWeather";
import Search from "./components/Search/Search";
import { WEATHER_API_URL } from "./api";
import { useState, useEffect } from "react";
import Heading from "./components/Heading/Heading";
import ToggleButton from "./components/Toggle-Button/ToggleButton";
import toast, { Toaster } from "react-hot-toast";
import Forecast from "./components/Forecast/Forecast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [toggleButton, setToggleButton] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [permission, setPermission] = useState(false);

  const [userLocation, setUserLocation] = useState("");

  const fetchWeatherByCoords = async (lat: any, lon: any) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      const weatherResponse = await response.json();
      return weatherResponse;
    } catch (error) {
      throw error;
    }
  };

  const handleOnSearchChange = async (searchData: any) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const weatherResponse = await fetchWeatherByCoords(lat, lon);
      const forecastFetch = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      const forecastResponse = await forecastFetch.json();
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });

      localStorage.setItem(searchData.label, JSON.stringify(weatherResponse));
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    function getLocation() {
      if ("geolocation" in navigator) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            if (
              permissionStatus.state === "denied" ||
              permissionStatus.state === "prompt"
            ) {
              toast.error("Please allow location access to use this app");
              setPermission(false);
            } else {
              navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude.toString());
                setLongitude(position.coords.longitude.toString());
              });
              setPermission(true);
            }
          });
      } else {
        toast.error("Geolocation not supported by browser");
      }
    }

    async function getWeather() {
      try {
        const cachedWeatherData = localStorage.getItem("cachedWeather");
        let weatherResponse;

        if (cachedWeatherData) {
          weatherResponse = JSON.parse(cachedWeatherData);
          if (weatherResponse.cod === "400") {
            weatherResponse = await fetchWeatherByCoords(latitude, longitude);
            localStorage.setItem(
              "cachedWeather",
              JSON.stringify(weatherResponse)
            );
          }
        } else {
          weatherResponse = await fetchWeatherByCoords(latitude, longitude);
          localStorage.setItem(
            "cachedWeather",
            JSON.stringify(weatherResponse)
          );
        }

        setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
        setUserLocation(weatherResponse.name);
      } catch (error: any) {
        toast.error(error);
      }
    }

    getLocation();
    getWeather();
  }, [latitude, longitude]);

  return (
    <div className="w-full flex justify-start items-center min-h-screen overflow-x-hidden flex-col">
      <div>
        <Toaster />
      </div>
      {
        !permission && (
          <div className='flex justify-center items-center w-full border h-screen text-lg'>
            Enable location
          </div>
        )
      }
      {permission && <Heading currLocation={userLocation} />}
      {permission && <Search onSearchChange={handleOnSearchChange} />}
      {currentWeather && permission && (
        <CurrentWeather data={currentWeather} toggleButton={toggleButton} />
      )}  
      {currentWeather && permission && (
        <ToggleButton
          toggleButton={toggleButton}
          onToggle={() => setToggleButton(!toggleButton)}
        />
      )}
      {
        forecast && <Forecast data={forecast}/>
      }
    </div>
  );
};

export default App;
