"use client";
import React, { useEffect, useState } from "react";
import { useScreenSize } from "../../hooks/useScreenSize";
import useRecentSearches from "@/hooks/useRecentSearch";

const TopSearch = () => {
  const { data, areas, images } = useRecentSearches();
  return (
    <div>
      <h1 className="text-left text-xl mt-4 mb-4 ml-4 font-bold">
        Your Recent Searches
      </h1>
      <div className="overflow-auto flex space-x-4 p-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-8 shadow-md flex flex-col items-center justify-center  bg-white"
          >
            <div className="mb-4 text-center  w-48">
              <p className="font-semibold text-xs">{areas[index]}</p>
              <p className="font-bold text-lg">{item.temperature}</p>
            </div>

            {images[index] ? (
              <img
                src={images[index]}
                alt={`Weather for ${areas[index]}`}
                className="h-[30px] w-[30px] object-cover"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearch;
