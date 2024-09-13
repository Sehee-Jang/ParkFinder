import { useQueryClient, useMutation } from "@tanstack/react-query";
import tempApi from "../api/tempApi";

export const useHandleBookMark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: tempApi.updateBookMark,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return mutate;
};
