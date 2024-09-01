import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import data from "../data/locality.json";
import { useScreenSize } from "@/hooks/useScreenSize";

type Query = {
  area: string;
  locality_id: string;
};

export const useSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<Query | null>(null);
  const [suggests, setSuggests] = useState<Query[]>([]);
  const [recentSearches, setRecentSearches] = useState<Query[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const itemsPerPage = 10;
  const router = useRouter();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  const { isLargeMobile, isLargeView, isMobileView, isIpad } = useScreenSize();

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    ) as Query[];
    setRecentSearches(storedSearches);
  }, []);

  const autoSuggest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);
    setSuggests([]);
    setHasMore(true);

    if (value) {
      loadMoreSuggestions(value, 1);
    }
  };

  const loadMoreSuggestions = (value: string, pageNumber: number) => {
    const filteredData = data
      .filter((item) => item.area.toLowerCase().includes(value.toLowerCase()))
      .slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage);

    if (filteredData.length < itemsPerPage) {
      setHasMore(false);
    }

    setSuggests((prev) => [...prev, ...filteredData]);
  };

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            loadMoreSuggestions(search, nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 1.0 }
    );
    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }
  }, [suggests, hasMore]);

  useEffect(() => {
    if (query?.area && query?.locality_id) {
      const recentSearches = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      ) as Query[];
      const updatedSearches = [
        query,
        ...recentSearches.filter(
          (item) => item.locality_id !== query.locality_id
        ),
      ];
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
      setSearch("");
      router.push(
        `/main?locality_id=${encodeURIComponent(
          query.locality_id
        )}&area=${encodeURIComponent(query.area)}`
      );
    }
  }, [query, router]);

  const setTheLocation = (area: string, locality_id: string) => {
    setSearch(area);
    setSuggests([]);
    setQuery({ area, locality_id });
  };

  return {
    search,
    suggests,
    recentSearches,
    setSearch,
    setTheLocation,
    lastElementRef,
    autoSuggest,
  };
};
