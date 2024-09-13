import axios from "axios";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Axios 인스턴스 생성
const commentApi = axios.create({
  baseURL: "http://localhost:5000/comments"
});

// Zustand 스토어 생성
const useCommentStore = create((set) => ({
  newComment: "",
  editingComment: { id: null, text: "" },
  setNewComment: (comment) => set({ newComment: comment }),
  setEditingComment: (id, text) => set({ editingComment: { id, text } })
}));

// 서버에서 댓글 불러오는 함수
const fetchComments = async () => {
  const { data } = await commentApi.get("/");
  return data;
};

// 서버에 새 댓글 생성하는 함수
const postComment = async (comment) => {
  const { data } = await commentApi.post("/", {
    ...comment,
    userId: "s77772005", //임시로 ID 넣어놈.
    createdAt: new Date().toISOString()
  });

  return data;
};

// 서버에서 댓글을 삭제하는 함수
const deleteComment = async (id) => {
  await commentApi.delete(`/${id}`);

  return id;
};

// 서버에서 댓글 수정하는 함수
const updateComment = async ({ id, text }) => {
  const { data } = await commentApi.patch(`/${id}`, {
    text,
    createdAt: new Date().toISOString()
  });
};

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
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      alert("댓글이 삭제되었습니다!");
    }
  });

  // 댓글 수정
  const { mutate: edit } = useMutation({
    mutationFn: ({ id, text }) => updateComment({ id, text }),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      alert("댓글이 수정되었습니다!");
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
