import { useState, useEffect } from "react";
import axios from "axios";
import { check_data } from "./../app/Utils/global"; // Adjust the import path as necessary

const useRecentSearches = () => {
  const [data, setData] = useState<any[]>([]);
  const [storedIds, setStoredIds] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getItemFromLocalStorage = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    const allSearches = getItemFromLocalStorage.reverse();
    console.log("All recent searches are", allSearches);

    const ids = allSearches.map((search: any) => search.locality_id);
    const areas = allSearches.map((item: any) => item.area);

    setStoredIds(ids);
    setAreas(areas);

    const callTheLocalityId = async () => {
      try {
        const promises = ids.map((locality_id: string) =>
          axios.get(
            "https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data",
            {
              params: { locality_id },
              headers: {
                "X-Zomato-Api-Key": "f6456e4e753b1d5ac0840a324128bb96",
              },
            }
          )
        );

        const responses = await Promise.all(promises);

        const weatherData = responses.map(
          (response) => response.data.locality_weather_data
        );

        console.log("Weather data is", weatherData);
        setData(weatherData);
        setImages(weatherData.map((item) => check_data(item).imgSrc));
      } catch (error) {
        console.error("Error fetching weather data for recent searches", error);
      }
    };

    callTheLocalityId();
  }, []);

  return { data, areas, images };
};

export default useRecentSearches;
