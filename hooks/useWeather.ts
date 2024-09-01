// hooks/useWeather.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { check_data } from "./../app/Utils/global";

const useWeather: any = (
  locality_id: string | null,
  area: string | null,
  favArr: any[],
  setFavArr: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [val, setVal] = useState({
    temperature: "",
    humidity: "",
    wind_direction: "",
    wind_speed: "",
    rain_intensity: "",
  });
  const [fav, setFav] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [time, setTime] = useState<number>(new Date().getHours());

  useEffect(() => {
    const isFav = favArr.some((item) => item.locality_id === locality_id);
    setFav(isFav);
  }, [locality_id, favArr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!locality_id) return;

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data`,
          {
            params: { locality_id },
            headers: {
              "X-Zomato-Api-Key": "f6456e4e753b1d5ac0840a324128bb96",
            },
          }
        );
        setVal({
          temperature: response.data.locality_weather_data.temperature || "",
          humidity: response.data.locality_weather_data.humidity || "",
          wind_direction:
            response.data.locality_weather_data.wind_direction || "",
          wind_speed: response.data.locality_weather_data.wind_speed || "",
          rain_intensity:
            response.data.locality_weather_data.rain_intensity || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeatherData();
  }, [locality_id]);

  useEffect(() => {
    const { imgSrc } = check_data(val);
    setImgSrc(imgSrc);
  }, [val]);

  const changeToFav = () => {
    const newFavArr = fav
      ? favArr.filter((item) => item.locality_id !== locality_id)
      : [...favArr, { locality_id, area, ...val }];

    setFavArr(newFavArr);
    localStorage.setItem("favArr", JSON.stringify(newFavArr));
    setFav(!fav);
  };

  const now = new Date();
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const ctime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    val,
    fav,
    imgSrc,
    time,
    changeToFav,
    weekday,
    ctime,
  };
};

export default useWeather;
