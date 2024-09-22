import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, fetchComments, postComment, updateComment } from "../../api/comments";
import { useCommentStore } from "../../zustand/commentStore";
import useAuthStore from "../../zustand/authStore";
import { getUserProfile } from "../../api/auth";
import { useEffect } from "react";
import { useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../assets/images/default_img.png";

const Comments = ({ placeId }) => {
  const { newComment, setNewComment, editingComment, setEditingComment } = useCommentStore();

  const { token, user, setUser } = useAuthStore();

  const queryClient = useQueryClient();

  //사용자가 로그인 했는지 확인하는 함수
  const isLoggedIn = !!user && user.success;

  //최신 유저 정보 가져오기
  const { data: latestUserInfo } = useQuery({
    queryKey: ["userInfo", user?.id],
    queryFn: () => getUserProfile(token),
    enabled: !!user && !!token // 유저와 토큰이 있을 때만 쿼리 실행
  });

  //유저 정보 업데이트
  useEffect(() => {
    if (latestUserInfo) {
      setUser(latestUserInfo);
    }
  }, [latestUserInfo, setUser]);

  //댓글 목록 불러오기
  const {
    data: comments,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["comments", placeId],
    queryFn: () => fetchComments(placeId)
  });

  //최신 프로필 정보와 댓글 데이터 결합 (클라이언트 측 업데이트)
  const updatedComments = useMemo(() => {
    if (!comments) return [];
    return comments.map((comment) => {
      if (comment.userId === user?.id) {
        //현재 로그인한 사용자의 댓글인 경우, 최신 프로필 정보로 업데이트
        return {
          ...comment,
          nickname: user.nickname,
          avatar: user.avatar
        };
      }
      return comment;
    });
  }, [comments, user]);

  //새 댓글 생성
  const { mutate: add } = useMutation({
    mutationFn: (comment) => postComment({ ...comment, placeId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", placeId]);

      toast.success("댓글이 추가되었습니다!");
    }
  });

  //댓글 삭제
  const { mutate: remove } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", placeId]);
      toast.error("댓글이 삭제되었습니다!");
    }
  });

  //댓글 수정 (낙관적 업데이트 적용)
  const { mutate: edit } = useMutation({
    mutationFn: updateComment,
    onMutate: async ({ id, text }) => {
      //이전 쿼리 데이터 취소
      await queryClient.cancelQueries(["comments", placeId]);

      //이전 값의 스냅샷 저장
      const previousComments = queryClient.getQueryData(["comments", placeId]);

      //새 댓글로 캐시를 즉시 업데이트
      queryClient.setQueryData(["comments", placeId], (old) =>
        old.map((comment) => (comment.id === id ? { ...comment, text } : comment))
      );

      toast("댓글이 수정되었습니다!");

      //수정 모드 즉시 종료
      setEditingComment(null, "");

      //이전 값 오류때 쓸 수도 있으니 리턴해줌
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      //에러가 발생하면 이전 값으로 콜백
      queryClient.setQueryData(["comments", placeId], context.previousComments);
      toast.success("댓글 수정 중 오류 발생했습니다!" + err.message);
    },
    onSettled: () => {
      //성공 여부와 관계없이 쿼리를 다시 불러옴
      queryClient.invalidateQueries(["comments", placeId]);
    }
  });

  //댓글 수정 제출 핸들러 함수
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingComment.text.trim() !== "") {
      edit({ id: editingComment.id, text: editingComment.text });
    }

    setEditingComment(null, "");
  };

  //댓글 제출 핸들러 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim() !== "") {
      const comment = {
        text: newComment,
        userId: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        placeId: placeId
      };

      add(comment);

      setNewComment("");
    }
  };

  //로딩 상태 및 에러 처리
  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  //placeId에 해당하는 댓글만 보여주기
  const filteredComments = updatedComments.filter((comment) => comment.placeId === placeId);

  return (
    <div>
      {/* 로그인한 사용자만 댓글 작성 폼 표시*/}
      {isLoggedIn ? (
        <form onSubmit={handleSubmit} className="my-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요..."
            className="w-full p-3 border border-zinc-300 rounded-md focus:ring-2 focus:ring-[#3cb8a6] "
          />
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="button button-xs shadow-md"
            >
              댓글 작성
            </button>
          </div>
        </form>
      ) : (
        <p className="my-20 text-sm text-zinc-600">댓글을 작성하려면 로그인을 해주세요.</p>
      )}

      {/* 댓글 목록 표시 */}
      <div className="space-y-5 max-h-[320px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-[#3cb8a6] scrollbar-track-zinc-200">
        {filteredComments.reverse().map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out"
          >
            {/* 수정 모드일 때 댓글 수정폼 표시 */}
            {editingComment.id === comment.id ? (
              <form onSubmit={handleEditSubmit}>
                <textarea
                  value={editingComment.text}
                  onChange={(e) => setEditingComment(comment.id, e.target.value)}
                  placeholder="수정하시려는 내용을 입력해주세요."
                  className="w-full border p-1 rounded-md"
                />
                <div className="flex flex-row justify-end gap-1">
                  <button type="submit" className="px-2 py-1 text-sm rounded hover:bg-blue-300 hover:text-white">
                    완료
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingComment(null, "")}
                    className="px-2 py-1 text-sm rounded hover:bg-red-300 hover:text-white"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              //일반 댓글 표시
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={comment.avatar || defaultImage}
                    alt={`${comment.nickname}의 프로필`}
                    className="w-12 h-12 rounded-full object-cover object-center"
                  />
                  <strong>{comment.nickname}</strong>
                </div>

                <p>{comment.text}</p>

                <small className="text-xs text-zinc-500">
                  {comment.userId}_{new Date(comment.createdAt).toLocaleString()}
                </small>

                {/* 자신의 댓글에만 수정/삭제 버튼 표시 */}
                {isLoggedIn && user.id === comment.userId ? (
                  <div className="flex flex-row justify-end items-center gap-1">
                    <button
                      onClick={() => setEditingComment(comment.id, comment.text)}
                      className="px-2 py-1 text-sm rounded hover:bg-blue-300 hover:text-white"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => remove(comment.id)}
                      className="px-2 py-1 text-sm rounded hover:bg-red-300 hover:text-white"
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
