"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { check_data } from "../Utils/global";
import Image from "next/image";
import h33 from "./../../public/h33.png";
import useWeatherCarousel from "@/hooks/useCarousel";
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

const Carousel = () => {
  const { data, city, area, imgs, currentIndex, itemsPerPage } =
    useWeatherCarousel();

  return (
    <div className="mt-10 text-black">
      <h1 className="">
        <Image src={h33} alt="" />
      </h1>
      <div className="flex items-center justify-center mt-10">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6 rounded-lg"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)`,
            }}
          >
            {data.map((item, index) => (
              <div
                key={index}
                className="min-w-[200px] card border p-5 rounded-lg"
              >
                <h3>{city[index]}</h3>
                <h3>{area[index]}</h3>
                {imgs[index] && (
                  <img
                    src={imgs[index].imgSrc}
                    alt={imgs[index].description}
                    className="h-[30px]"
                  />
                )}
                <p>{item.temperature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
