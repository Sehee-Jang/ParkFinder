import { useQuery } from "@tanstack/react-query";
import tempApi from "../api/tempApi";

export const useGetPlaces = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: tempApi.fetchPlaces,
  });
};
