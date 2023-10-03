import { useState } from "react";

interface Props {
  data: any;
}

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }: Props) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  
  const [expand, setExpand] = useState(-1);

  const expandId = (currentId: any) => {
    setExpand(expand === currentId ? -1 : currentId);
  }

  return (
    <div className="mt-2 w-1/2 flex flex-col gap-5">
      <label className="text-2xl font-bold">Daily</label>
      {data.list.splice(0, 7).map((item: any, idx: any) => (
        <div>
          <div className={`${expand === idx ? "rounded-none border-x border-red-400 border-t rounded-ss-lg rounded-se-lg" : "border rounded-lg border-red-400"} flex flex-row justify-between items-center p-1 cursor-pointer hover:bg-red-100`} onClick={() => expandId(idx)}>
            <div className="flex flex-row gap-5 items-center">
              <img
                src={`icons/${item.weather[0].icon}.png`}
                alt="weather"
                className="h-12"
              />
              <label>{forecastDays[idx]}</label>
            </div>
            <div className="flex flex-row gap-5 items-center">
              <label>{item.weather[0].description}</label>
              <label>
                {Math.round(item.main.temp_max)} °C /{" "}
                {Math.round(item.main.temp_min)} °C{" "}
              </label>
            </div>
          </div>
          <div className={`${expand === idx ? "border-x border-b border-red-400 rounded-es-lg rounded-ee-lg" :  "hidden"} flex flex-col p-2`}>
            <div className='flex flex-row justify-between'>
                <label>Temperature:</label>
                <label>{item.main.temp} °C</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Pressure:</label>
                <label>{item.main.pressure} hPa</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Humidity:</label>
                <label>{item.main.humidity}</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Clouds:</label>
                <label>{item.clouds.all}%</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Wind Speed:</label>
                <label>{item.wind.speed} m/s</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Sea level:</label>
                <label>{item.main.sea_level} m</label>
            </div>
            <div className='flex flex-row justify-between'>
                <label>Feels Like:</label>
                <label>{item.main.feels_like} °C </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
