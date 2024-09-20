import { useQuery } from "@tanstack/react-query";
import bookmarkApi from "../api/bookmark";

export const useGetPlaces = () => {
  return useQuery({
    queryKey: ["places"],
    queryFn: bookmarkApi.fetchPlaces
  });
};
