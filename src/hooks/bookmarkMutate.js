import { useQueryClient, useMutation } from "@tanstack/react-query";
import bookmarkApi from "../api/bookmark";

export const useHandleBookMark = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: bookmarkApi.handleBookmarkToggle,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["posts"]);
    // },
    onMutate: async (updateData) => {
      console.log(updateData);
      // posts쿼리키로 데이터를 가져오는 것을 중단시킴
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // place리스트를 가져옴
      const previousPlaces = queryClient.getQueryData(["posts"]);

      // previousPlaces리스트에서 업데이트 해야되는 현재 게시글을 가져옴
      const placeToUpdate = previousPlaces.find((place) => place.id === updateData.id);

      // 그러면 filteredPreviousPlace의 bookmarks의 배열을 새롭게
      // 업데이트를 해줘야함 만약 updateData.id가 존재하면 해당 아이디를 삭제하고
      // 존재하지 않으면 해당 아이디를 추가해야함
      // queryClient.setQueryData(["posts"], filterPreviousPlace[0]["id"]);

      // 기존 북마크 상태를 복사하여 유저의 아이디 값이 있거나 없을 때
      // 유저의 아이디 값을 삭제하거나 추가하는 로직
      const updatedBookmarks = updateData.bookmarked
        ? placeToUpdate.bookmarks.filter((user) => user.userId !== updateData.userId)
        : [...placeToUpdate.bookmarks, { userId: updateData.userId }];

      // 변경된 북마크 상태를 미리 클라이언트에 해주기 => 낙관적 업데이트
      queryClient.setQueryData(["posts"], (places) =>
        places.map((place) => (place.id === updateData.id ? { ...place, bookmarks: updatedBookmarks } : place))
      );
      return { previousPlaces };
    },
    onError: (err, updateData, context) => {
      queryClient.setQueryData(["posts"], context.previousPlaces);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  return mutate;
};
