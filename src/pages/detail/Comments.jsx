import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, fetchComments, postComment, updateComment } from "../../api/comments";
import { useCommentStore } from "../../zustand/commentStore";

const Comments = () => {
  const { newComment, setNewComment, editingComment, setEditingComment } = useCommentStore();

  const queryClient = useQueryClient();

  //댓글 목록 불러오기
  const {
    data: comments,
    isPending,
    isError,
    error
  } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments
  });

  // 새 댓글 생성
  const { mutate: add } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      alert("댓글이 추가되었습니다!");
    }
  });

  // 댓글 삭제
  const { mutate: remove } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      alert("댓글이 삭제되었습니다!");
    }
  });

  // 댓글 수정 (낙관적 업데이트 적용)
  const { mutate: edit } = useMutation({
    mutationFn: updateComment,
    onMutate: async ({ id, text }) => {
      // 이전 쿼리 데이터 취소
      await queryClient.cancelQueries(["comments"]);

      // 이전 값의 스냅샷 저장
      const previousComments = queryClient.getQueryData(["comments"]);

      // 새 댓글로 캐시를 즉시 업데이트
      queryClient.setQueriesData(["comments"], (old) =>
        old.map((comment) => (comment.id === id ? { ...comment, text } : comment))
      );

      // 수정 모드 즉시 종료
      setEditingComment(null, "");

      // 이전 값 오류때 쓸 수도 있으니 리턴해줌
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      //에러가 발생하면 이전 값으로 콜백
      queryClient.setQueryData(["comments"], context.previousComments);
      alert("댓글 수정 중 오류 발생했습니다!" + error.message);
    },
    onSettled: () => {
      // 성공 여부와 관계없이 쿼리를 다시 불러옴
      queryClient.invalidateQueries(["comments"]);
    }
  });

  // 수정 모드 토글 함수
  const toggleEdit = (id, text) => {
    if (editingComment.id === id) {
      setEditingComment(null, "");
    } else {
      setEditingComment(id, text);
    }
  };

  // 댓글 수정 제출 핸들러 함수
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingComment.text.trim() !== "") {
      edit({ id: editingComment.id, text: editingComment.text });
    }

    setEditingComment(null, "");
  };

  // 댓글 제출 핸들러 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim() !== "") {
      const comment = {
        text: newComment
      };

      add(comment);

      setNewComment("");
    }
  };

  // 로딩 상태 및 에러 처리
  if (isPending) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      <h1>댓글 공간</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button type="submit">댓글 작성</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            {editingComment.id === comment.id ? (
              <>
                <form onSubmit={handleEditSubmit}>
                  <textarea
                    value={editingComment.text}
                    onChange={(e) => setEditingComment(comment.id, e.target.value)}
                    placeholder="수정하시려는 내용을 입력해주세요."
                  />
                  <button type="submit">완료</button>
                  <button type="button" onClick={() => setEditingComment(null, "")}>
                    취소
                  </button>
                </form>
              </>
            ) : (
              <>
                <p>{comment.text}</p>
                <small>
                  {comment.userId}_{new Date(comment.createdAt).toLocaleString()}
                </small>
                <button onClick={() => toggleEdit(comment.id, comment.text)}>수정</button>
                <button onClick={() => remove(comment.id)}>삭제</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
