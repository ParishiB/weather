import { useState, useEffect } from "react";
import axios from "axios";
import { check_data } from "./../app/Utils/global";

export const locality = [
  {
    city: "Vijayawada",
    area: "Labbipet",
    locality_id: "ZWL003905",
  },
  {
    city: "Jalandhar",
    area: "Shastri Nagar",
    locality_id: "ZWL009921",
  },
  {
    city: "Nagpur",
    area: "Dharampeth",
    locality_id: "ZWL008282",
  },
  {
    city: "Nagpur",
    area: "Manish Nagar",
    locality_id: "ZWL001041",
  },

  {
    city: "Bhubaneswar",
    area: "Chandrasekharpur",
    locality_id: "ZWL009572",
  },
  {
    city: "Bhubaneswar",
    area: "Patia",
    locality_id: "ZWL005652",
  },
  {
    city: "Coimbatore",
    area: "Gandhipuram",
    locality_id: "ZWL003661",
  },
  {
    city: "Ludhiana",
    area: "Ganesh Nagar",
    locality_id: "ZWL003304",
  },
  {
    city: "Ludhiana",
    area: "Dugri",
    locality_id: "ZWL003119",
  },
  {
    city: "Guwahati",
    area: "Pathar Quarry",
    locality_id: "ZWL006981",
  },
  {
    city: "Chandigarh",
    area: "Gillco",
    locality_id: "ZWL009894",
  },
  {
    city: "Chandigarh",
    area: "Sector 46",
    locality_id: "ZWL004101",
  },
  {
    city: "Jaipur",
    area: "Pratap Nagar",
    locality_id: "ZWL006372",
  },

  {
    city: "Ahmedabad",
    area: "Paldi",
    locality_id: "ZWL003133",
  },

  {
    city: "Kochi",
    area: "Vypin",
    locality_id: "ZWL002327",
  },

  {
    city: "Jaipur",
    area: "Mansarovar-2",
    locality_id: "ZWL005082",
  },
  {
    city: "Lucknow",
    area: "Aliganj, Lucknow",
    locality_id: "ZWL007731",
  },
  {
    city: "Lucknow",
    area: "Kalyanpur",
    locality_id: "ZWL007011",
  },
  {
    city: "Chennai",
    area: "T Nagar",
    locality_id: "ZWL001516",
  },
  {
    city: "Lucknow",
    area: "Hazratganj",
    locality_id: "ZWL003425",
  },
  {
    city: "Pune",
    area: "Wanowrie-Kondhwa",
    locality_id: "ZWL007925",
  },
  {
    city: "Hyderabad",
    area: "Nagole",
    locality_id: "ZWL003370",
  },
];

type ImageData = {
  imgSrc: string;
  description: string;
};

const useWeatherCarousel = () => {
  const [data, setData] = useState<any[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const [area, setArea] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imgs, setImgs] = useState<ImageData[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const promises = [];
      const cityList: string[] = [];
      const areaList: string[] = [];

      for (let i = 0; i < locality.length; i++) {
        const ind = Math.floor(Math.random() * locality.length);
        const locality_id = locality[ind].locality_id;

        const apiCall = axios.get(
          "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
          {
            params: { locality_id },
            headers: {
              "X-Zomato-Api-Key": "f6456e4e753b1d5ac0840a324128bb96",
            },
          }
        );
        promises.push(apiCall);
        cityList.push(locality[ind].city);
        areaList.push(locality[ind].area);
      }

      try {
        const responses = await Promise.all(promises);
        const weatherData = responses.map(
          (response) => response.data.locality_weather_data
        );

        const newImgs = weatherData.map(check_data);
        setImgs(newImgs);
        setData(weatherData);
        setCity(cityList);
        setArea(areaList);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex < Math.max(data.length - itemsPerPage - 8, 0)
          ? prevIndex + 1
          : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  return { data, city, area, imgs, currentIndex, itemsPerPage };
};

export default useWeatherCarousel;
