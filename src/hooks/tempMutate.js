import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchPlaces, updateBookMark } from "../api/tempApi";

export const useGetPlaces = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPlaces,
  });
};

export const useHandleBookMark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return mutate;
};
