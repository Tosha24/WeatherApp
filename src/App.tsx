import CurrentWeather from "./components/Current-Weather/CurrentWeather";
import Search from "./components/Search/Search";
import { WEATHER_API_URL } from "./api";
import { useState, useEffect } from "react";
import Heading from "./components/Heading/Heading";
import ToggleButton from "./components/Toggle-Button/ToggleButton";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [toggleButton, setToggleButton] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [userLocation, setUserLocation] = useState("");

  // Function to fetch weather data by coordinates
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
      setCurrentWeather({ city: searchData.label, ...weatherResponse });

      localStorage.setItem(searchData.label, JSON.stringify(weatherResponse));
    } catch (error: any) {
      toast.error(error);
    }
  };

  useEffect(() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      });
    }

    async function getWeather() {
      try {
        const cachedWeatherData = localStorage.getItem("cachedWeather");
        let weatherResponse;

        if (cachedWeatherData) {
          weatherResponse = JSON.parse(cachedWeatherData);
        } else {
          weatherResponse = await fetchWeatherByCoords(latitude, longitude);
          localStorage.setItem("cachedWeather", JSON.stringify(weatherResponse));
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
    <div className="w-screen flex justify-start items-center min-h-screen flex-col">
      <div>
        <Toaster />
      </div>
      <Heading currLocation={userLocation} />
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather data={currentWeather} toggleButton={toggleButton} />
      )}
      <ToggleButton
        toggleButton={toggleButton}
        onToggle={() => setToggleButton(!toggleButton)}
      />
    </div>
  );
};

export default App;
