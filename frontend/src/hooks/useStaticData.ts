import { useState, useEffect } from "react";
import * as scopeOfWorksService from "../services/scopeOfWorks";
import * as roomsService from "../services/rooms";

interface StaticData {
  scopeOfWorks: { _id: string; name: string }[];
  rooms: { _id: string; name: string }[];
  isLoading: boolean;
  error: string | null;
}

const useStaticData = () => {
  const [staticData, setStaticData] = useState<StaticData>({
    scopeOfWorks: [],
    rooms: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [scopeOfWorks, rooms] = await Promise.all([
          scopeOfWorksService.getScopeOfWorks(),
          roomsService.getRooms(),
        ]);

        if (isMounted) {
          setStaticData({
            scopeOfWorks,
            rooms,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error fetching static data:", error);
        if (isMounted) {
          setStaticData((prev) => ({
            ...prev,
            isLoading: false,
            error:
              "Failed to load some static data. Some features may be limited.",
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return staticData;
};

export default useStaticData;
