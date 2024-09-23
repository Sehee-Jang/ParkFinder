import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bookmarkApi from "../api/bookmark";

export const useCreatePlaceAndUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkApi.createPlaceAndUpdate,
    onMutate: async (updateData) => {
      await queryClient.cancelQueries({ queryKey: ["places"] });

      const previousPlaces = queryClient.getQueryData(["places"]);

      const placeToUpdate = previousPlaces.find((place) => place.id === updateData.place.id);

      if (placeToUpdate) {
        // 북마크한 장소가 이미 있을 경우 북마크를 업데이트
        const userBookmarkExists = placeToUpdate.bookmarks.some((bookmark) => bookmark.userId === updateData.userId);

        if (userBookmarkExists) {
          toast.error("북마크가 삭제되었습니다!");
          placeToUpdate.bookmarks = placeToUpdate.bookmarks.filter((bookmark) => bookmark.userId !== updateData.userId);
        } else {
          toast.success("북마크가 추가되었습니다!");
          placeToUpdate.bookmarks = [...placeToUpdate.bookmarks, { userId: updateData.userId }];
        }

        // 변경된 상태를 쿼리에 반영
        queryClient.setQueryData(
          ["places"],
          previousPlaces.map((place) => (place.id === placeToUpdate.id ? placeToUpdate : place))
        );
      } else {
        // 북마크한 장소가 없을 경우 새로운 장소 생성
        const newPlace = {
          id: updateData.place.id,
          title: updateData.place.place_name,
          address_name: updateData.place.address_name,
          bookmarks: [{ userId: updateData.userId }]
        };
        queryClient.setQueryData(["places"], [...previousPlaces, newPlace]);
      }

      return { previousPlaces };
    },
    onError: (error, context) => {
      console.error("북마크 생성 및 업데이트 도중 에러", error);
      queryClient.setQueryData(["places"], context.previousPlaces);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["places"]);
    }
  });
};
