interface Props {
  data: any;
  toggleButton: boolean;
}

const CurrentWeather = ({ data, toggleButton }: Props) => {
  return (
    <div className="max-w-[90vw] min-w-[22vw] mt-4 rounded-3xl border-2 border-red-400 shadow-shadow text-black bg-white/60  p-5">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg m-0 tracking-wide">
            {data?.city}
          </p>
          <p className="font-normal text-sm m-0">
            {data?.weather && data?.weather[0]?.main}
          </p>
        </div>{" "}
       
        <img

          src={`icons/${data?.weather && data?.weather[0]?.icon}.png`}
          alt="weather"
        
          className="w-20 md:w-24 animate-pulse"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-4xl md:text-6xl w-auto flex flex-nowrap tracking-normal my-3 mx-0">
          {toggleButton
            ? `${Math.round(data?.main?.temp)}°C`
            : `${Math.round((parseFloat(data?.main?.temp) * 9) / 5 + 32.0)}°F`}
        </p>
        <div className="w-full pl-5">
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Feels like</span>
            <span className="text-right font-semibold text-xs">
              {toggleButton
                ? `${Math.round(data?.main?.feels_like)}°C`
                : `${Math.round(
                    (parseFloat(data?.main?.feels_like) * 9) / 5 + 32.0
                  )}°F`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-left font-normal text-xs">Wind</span>
            <span className="text-right font-semibold text-xs">
              {parseFloat(data?.wind?.speed).toFixed(1)} m/s
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-left font-normal text-xs">Humidity</span>
            <span className="text-right font-semibold text-xs">
              {data?.main?.humidity}%
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-left font-normal text-xs">Pressure</span>
            <span className="text-right font-semibold text-xs">
              {Math.round(data?.main?.pressure)} mb
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;