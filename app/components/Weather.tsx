"use client";
import { Suspense, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import CartoonSun from "./../../public/cartoonSun.png";
import Search from "./Search";
import useWeather from "@/hooks/useWeather";

type WeatherProps = {
  locality_id: string | null;
  area: string | null;
  favArr: any[];
  setFavArr: React.Dispatch<React.SetStateAction<any[]>>;
  onUpdate?: () => void;
};

export default function Weather({
  locality_id,
  area,
  favArr,
  setFavArr,
  onUpdate,
}: WeatherProps) {
  const { val, fav, imgSrc, changeToFav, weekday, ctime } = useWeather(
    locality_id,
    area,
    favArr,
    setFavArr
  );

  useEffect(() => {
    if (onUpdate) onUpdate();
  }, [locality_id, area, favArr, setFavArr, onUpdate]);
  return (
    <>
      <Suspense>
        <div className="w-full">
          <Image
            src={CartoonSun}
            alt="Cartoon Sun"
            className="h-[300px] w-[300px] -mb-28"
          />
          <Search />
        </div>
        <div className="relative text-black overflow-hidden">
          <div className="z-10 p-8 pb-0 bg-white rounded-lg border m-5">
            {val && (
              <div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <p className="text-lg font-semibold">{area}</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {val.temperature}°
                        </p>
                      </div>
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt="Weather Icon"
                          className="h-16 w-16 object-contain"
                        />
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{weekday}</p>
                      <p className="text-sm text-gray-500">{ctime}</p>
                    </div>
                  </div>
                  <div className="text-sm mt-4">
                    <p className="mb-1">Humidity: {val.humidity}%</p>
                    <p className="mb-1">Wind Direction: {val.wind_direction}</p>
                    <p>Wind Speed: {val.wind_speed} km/h</p>
                  </div>
                  <div
                    onClick={changeToFav}
                    className={`mt-6 flex items-center cursor-pointer ${
                      fav ? "text-yellow-500" : "text-gray-500"
                    }`}
                  >
                    <FaStar className="mr-2 text-xl" />
                    <span>
                      {fav ? "Remove from Favourite" : "Mark as Favourite"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Favorite Locations</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {favArr.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded shadow-sm flex-none w-48 text-center"
              >
                <p className="font-medium">{item.area}</p>
              </div>
            ))}
          </div>
        </div>
      </Suspense>
    </>
  );
}
